import json
from google import genai
from google.genai import types
from app.core.config import get_settings
from app.services.ai_prompts import build_analyze_prompt

class AIServiceError(Exception):
    pass

class GeminiAnalyzeService:
    def __init__(self):
        settings = get_settings()

        if not settings.ai_api_key:
            raise AIServiceError("Gemini API key is required")

        self.client = genai.Client(api_key=settings.ai_api_key)
        self.model = settings.ai_model
        self.default_tag = settings.ai_default_tag

    def analyze_text(self, text: str, tags: list[str] | None = None) -> dict:
        cleaned_text = self._clean_text(text)
        learning_tags = self._normalize_tags(tags)
        prompt = build_analyze_prompt(cleaned_text, learning_tags)

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.2,
                    max_output_tokens=2048,
                ),
            )
        except Exception as exc:
            raise AIServiceError("Gemini request failed") from exc

        if not response.text:
            raise AIServiceError("Gemini returned empty response")

        return self._parse_json_response(response.text)

    def _clean_text(self, text: str) -> str:
        cleaned_text = " ".join(text.strip().split())

        if not cleaned_text:
            raise AIServiceError("Input text is required")

        if len(cleaned_text) > 5000:
            raise AIServiceError("Input text is too long")

        return cleaned_text

    def _normalize_tags(self, tags: list[str] | None) -> list[str]:
        if not tags:
            return [self.default_tag]

        normalized_tags = []

        for tag in tags:
            clean_tag = tag.strip().lower()

            if clean_tag:
                normalized_tags.append(clean_tag)

        return normalized_tags or [self.default_tag]

    def _parse_json_response(self, raw_text: str) -> dict:
        cleaned_text = raw_text.strip()

        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text.removeprefix("```json").strip()

        if cleaned_text.startswith("```"):
            cleaned_text = cleaned_text.removeprefix("```").strip()

        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text.removesuffix("```").strip()

        try:
            result = json.loads(cleaned_text)
        except json.JSONDecodeError as exc:
            raise AIServiceError("Failed to parse Gemini JSON response") from exc

        if not isinstance(result, dict):
            raise AIServiceError("Gemini response must be a JSON object")

        return result

ai_service = GeminiAnalyzeService()

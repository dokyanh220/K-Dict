from typing import Literal
from pydantic import BaseModel, ValidationError
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_fixed
from app.services.ai_service import AIServiceError, ai_service

InputType = Literal["word", "phrase", "sentence"]

class AnalyzeItemData(BaseModel):
    text: str
    type: InputType
    meaning_vi: str
    explanation_vi: str | None = None
    example_en: str | None = None
    example_vi: str | None = None

class AnalyzeResultData(BaseModel):
    translated_vi: str
    input_type: InputType
    items: list[AnalyzeItemData]

class AnalyzeServiceError(Exception):
    pass

class AnalyzeService(BaseModel):
    def analyze(self, text: str, tags: list[str] | None = None) -> AnalyzeResultData:
        try:
            return self._analyze_once(text, tags=tags)
        except (AIServiceError, ValidationError) as exc:
            raise AnalyzeServiceError("Analyze result is invalid") from exc

    @retry(
        retry=retry_if_exception_type(ValidationError),
        stop=stop_after_attempt(2),
        wait=wait_fixed(0.3),
        reraise=True,
    )
    def _analyze_once(self, text: str, tags: list[str] | None = None) -> AnalyzeResultData:
        ai_result = ai_service.analyze_text(text, tags=tags)
        return AnalyzeResultData.model_validate(ai_result)

analyze_service = AnalyzeService()

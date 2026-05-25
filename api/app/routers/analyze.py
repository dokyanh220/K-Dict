from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(prefix="/api/analyze", tags=["Analyze"])


class AnalyzeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)


class AnalyzeItem(BaseModel):
    text: str
    type: Literal["word", "phrase", "sentence"]
    meaning_vi: str
    explanation_vi: str | None = None
    example_en: str | None = None
    example_vi: str | None = None


class AnalyzeResponse(BaseModel):
    translated_vi: str
    input_type: Literal["word", "phrase", "sentence"]
    items: list[AnalyzeItem]


@router.post("", response_model=AnalyzeResponse)
def analyze_text(payload: AnalyzeRequest):
    input_text = payload.text.strip()

    return {
        "translated_vi": f"Dịch nghĩa: {input_text}",
        "input_type": "sentence" if " " in input_text else "word",
        "items": [
            {
                "text": input_text,
                "type": "sentence" if " " in input_text else "word",
                "meaning_vi": "Nghĩa ví dụ",
                "explanation_vi": "Phần dịch nghĩa AI",
                "example_en": input_text,
                "example_vi": f"Dịch nghĩa: {input_text}",
            }
        ],
    }
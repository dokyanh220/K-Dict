from typing import Literal
import logging
from fastapi import APIRouter
from pydantic import BaseModel, Field
from app.core.config import get_settings
from app.core.errors import AppException, ErrorCode
from app.services.analyze_service import AnalyzeServiceError, analyze_service

router = APIRouter(prefix="/api/analyze", tags=["Analyze"])
logger = logging.getLogger(__name__)


class AnalyzeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    tags: list[str] | None = None

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
    try:
        return analyze_service.analyze(payload.text, tags=payload.tags)
    except AnalyzeServiceError as e:
        logger.exception("Analyze request failed")
        raise AppException(
            status_code=502,
            code=ErrorCode.ANALYZE_FAILED,
            message="Analyze service failed",
            details=str(e.__cause__ or e) if get_settings().app_debug else None,
        ) from e

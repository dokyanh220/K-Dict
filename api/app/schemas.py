from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


VocabType = Literal["word", "phrase", "sentence"]

class VocabBase(BaseModel):
    text: str | None = Field(default=None, min_length=1, max_length=255)
    type: VocabType | None = None
    meaning_vi: str | None = Field(default=None, min_length=1)
    explanation_vi: str | None = None
    example_en: str | None = None
    example_vi: str | None = None
    source_text: str | None = None
    note: str | None = None


class VocabCreate(VocabBase):
    pass


class VocabUpdate(BaseModel):
    text: str | None = Field(default=None, min_length=1, max_length=255)
    type: VocabType | None = None
    meaning_vi: str | None = Field(default=None, min_length=1)
    explanation_vi: str | None = None
    example_en: str | None = None
    example_vi: str | None = None
    source_text: str | None = None
    note: str | None = None


class VocabResponse(VocabBase):
    id: int
    created_at: datetime | None = None
    updated_at: datetime | None = None

    model_config = {
        "from_attributes": True
    }

class PaginationMeta(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int

class VocabListResponse(BaseModel):
    items: list[VocabResponse]
    pagination: PaginationMeta
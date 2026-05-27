from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class VocabItem(Base):
    __tablename__ = "vocab_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), index=True, nullable=True)
    text: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    meaning_vi: Mapped[str] = mapped_column(Text, nullable=False)
    explanation_vi: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_vi: Mapped[str | None] = mapped_column(Text, nullable=True)
    source_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

# {
#   "text": "improve",
#   "type": "word",
#   "meaning_vi": "cải thiện",
#   "explanation_vi": "Làm cho cái gì đó tốt hơn",
#   "example_en": "I want to improve my English.",
#   "example_vi": "Tôi muốn cải thiện tiếng Anh của mình.",
#   "source_text": null,
#   "note": "Từ hay dùng trong học tập và công việc"
# }

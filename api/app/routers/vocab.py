from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session
import math

from app.database import get_db
from app.models import VocabItem
from app.schemas import VocabCreate, VocabResponse, VocabUpdate, VocabListResponse, VocabType
from app.core.errors import AppException, ErrorCode

router = APIRouter(prefix="/api/vocab", tags=["Vocabulary"])

def normalize_text(text: str) -> str:
    return " ".join(text.strip().lower().split())

@router.post("", response_model=VocabResponse, status_code=status.HTTP_201_CREATED)
def create_vocab(payload: VocabCreate, db: Session = Depends(get_db)):
    normalized_text = normalize_text(payload.text)

    duplicated_item = (
        db.query(VocabItem).filter(
            func.lower(VocabItem.text) == normalized_text,
            VocabItem.type == payload.type
        ).first()
    )

    if duplicated_item:
        raise AppException(
            status_code=status.HTTP_409_CONFLICT,
            code=ErrorCode.VOCAB_DUPLICATED,
            message="Từ vựng đã tồn tại"
        )

    item = VocabItem(**payload.model_dump())
    item.text = payload.text.strip()

    db.add(item)
    db.commit()
    db.refresh(item)

    return item

@router.get("", response_model=VocabListResponse)
def get_vocab_items(
    search: str | None = Query(default=None),
    type: VocabType | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(VocabItem)

    if search:
        keyword = f"%{search.strip()}%"
        query = query.filter(
            or_(
                VocabItem.text.ilike(keyword),
                VocabItem.meaning_vi.ilike(keyword),
                VocabItem.note.ilike(keyword),
            )
        )

    if type:
        query = query.filter(VocabItem.type == type)

    total = query.count()
    total_pages = math.ceil(total / limit) if total else 0

    items = (
        query
        .order_by(VocabItem.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": items,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": total_pages,
        },
    }

@router.get("/{item_id}", response_model=VocabResponse)
def get_vocab_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(VocabItem, item_id)

    if not item:
        raise AppException(
            status_code=status.HTTP_404_NOT_FOUND,
            code=ErrorCode.VOCAB_NOT_FOUND,
            message="Không tìm thấy từ vựng",
        )

    return item

@router.put("/{item_id}", response_model=VocabResponse)
def update_vocab_item(
    item_id: int,
    payload: VocabUpdate,
    db: Session = Depends(get_db)
):
    item = db.get(VocabItem, item_id)

    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy từ vựng")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)

    return item

@router.delete("/{item_id}")
def delete_vocab_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(VocabItem, item_id)

    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy từ vựng")

    db.delete(item)
    db.commit()

    return {"message": "Xóa từ vựng thành công"}
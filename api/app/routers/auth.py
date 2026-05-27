from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.users import User
from app.services.auth_service import verify_google_token, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

class GoogleLoginRequest(BaseModel):
    id_token: str

@router.post("/google")
def login_with_google(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        google_user = verify_google_token(payload.id_token)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")
    
    user = db.query(User).filter(User.google_sub == google_user["sub"]).first()

    if not user:
        user = User(
            google_sub=google_user["sub"],
            email=google_user["email"],
            name=google_user.get("name"),
            avatar_url=google_user.get("picture"),
            provider="google"
        )
        db.add(user)
    else:
        user.email = google_user["email"]
        user.name = google_user.get("name")
        user.avatar_url = google_user.get("picture")

    user.last_login_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(user)

    access_token = create_access_token({
        "sub": str(user.id),
        "email": user.email
    })

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "avatar_url": user.avatar_url
        }
    }
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.core.config import get_settings
from app.database import get_db
from app.models.users import User
from app.services.auth.auth_service import verify_google_token, create_access_token, create_refresh_token
from app.core.security import get_current_user
from app.services.auth.auth_identity_service import get_or_create_user_by_provider

router = APIRouter(prefix="/api/auth", tags=["Auth"])

class GoogleLoginRequest(BaseModel):
    id_token: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

@router.post("/google")
def login_with_google(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        google_user = verify_google_token(payload.id_token)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")
    
    user = get_or_create_user_by_provider(
        db,
        email=google_user["email"],
        provider="google",
        provider_user_id=google_user["sub"],
        name=google_user.get("name"),
        avatar_url=google_user.get("picture"),
    )

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

    token_payload = {
        "sub": str(user.id),
        "email": user.email
    }

    access_token = create_access_token(token_payload)

    refresh_token = create_refresh_token(token_payload)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "avatar_url": user.avatar_url
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "avatar_url": current_user.avatar_url,
    }

@router.post("/refresh")
def refresh_access_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    try:
        settings = get_settings()

        decoded = jwt.decode(
            payload.refresh_token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )

        if decoded.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        
        user_id = decoded.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        
        user = db.query(User).filter(User.id == int(user_id)).first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        access_token = create_access_token({
            "sub": str(user.id),
            "email": user.email
        })

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid access token")

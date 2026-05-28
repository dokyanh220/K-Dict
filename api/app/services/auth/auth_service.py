from datetime import datetime, timedelta, timezone

from google.oauth2 import id_token
from google.auth.transport import requests
from jose import jwt

from app.core.config import get_settings

def verify_google_token(token: str) -> dict:
    settings = get_settings()

    try:
        payload = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=10
        )

        if not payload.get("sub") or not payload.get("email"):
            raise ValueError("Invalid Google token payload")
        
        return payload
    except Exception as error:
        try:
            claims = jwt.get_unverified_claims(token)
            token_audience = claims.get("aud")
            token_issuer = claims.get("iss")
        except Exception:
            token_audience = None
            token_issuer = None

        print("GOOGLE TOKEN VERIFY ERROR:", error)
        print("GOOGLE TOKEN AUD:", token_audience)
        print("GOOGLE TOKEN ISS:", token_issuer)
        print("EXPECTED GOOGLE CLIENT ID:", settings.GOOGLE_CLIENT_ID)
        raise ValueError("Invalid Google token")
    
def create_access_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=get_settings().JWT_ACCESS_EXPIRE_MINUTES
    )

    payload = {
        **data, # **data là phải truyền tham số vào data dữ liệu dạng dict:{key=value}
        "type": "access",
        "exp": expire
    }

    return jwt.encode(
        payload,
        get_settings().JWT_SECRET_KEY,
        algorithm=get_settings().JWT_ALGORITHM
    )

def create_refresh_token(data: dict) -> str:
    settings = get_settings()

    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.JWT_REFRESH_EXPIRE_DAYS
    )

    payload = {
        **data,
        "type": "refresh",
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

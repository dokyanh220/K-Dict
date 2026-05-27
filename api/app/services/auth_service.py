from datetime import datetime, timedelta, timezone

from google.oauth2 import id_token
from google.auth.transport import requests
from jose import jwt

from app.core.config import get_settings

def verify_google_token(token: str) -> dict:
    try:
        payload = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            get_settings().GOOGLE_CLIENT_ID
        )

        if not payload.get("sub") or not payload.get("email"):
            raise ValueError("Invalid Google token payload")
        
        return payload
    except Exception as error:
        print("GOOGLE TOKEN VERIFY ERROR:", error)
        print("BACKEND GOOGLE_CLIENT_ID:", get_settings().GOOGLE_CLIENT_ID)
        raise ValueError("Invalid Google token")
    
def create_access_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=get_settings().JWT_EXPIRE_MINUTES
    )

    payload = {
        **data, # **data là phải truyền tham số vào data dữ liệu dạng dict:{key=value}
        "exp": expire
    }

    return jwt.encode(
        payload,
        get_settings().JWT_SECRET_KEY,
        algorithm=get_settings().JWT_ALGORITHM
    )
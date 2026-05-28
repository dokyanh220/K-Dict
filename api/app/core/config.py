from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "K-Dict API"
    app_env: str = "development"
    app_debug: bool = True

    database_url: str = "sqlite:///./data/vocab.db"

    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    ai_provider: str = "gemini"
    ai_api_key: str
    ai_model: str = "gemini-3-flash-preview"
    ai_default_tag: str = "programmer"

    GOOGLE_CLIENT_ID: str

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_EXPIRE_MINUTES: float
    JWT_REFRESH_EXPIRE_DAYS: int

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]

@lru_cache
def get_settings() -> Settings:
    return Settings()
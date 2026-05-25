from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "K-Dict API"
    app_env: str = "development"
    app_debug: bool = True

    database_url: str = "sqlite:///./data/vocab.db"

    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    ai_provider: str = "fake"
    ai_api_key: str | None = None

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
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import get_settings
from app.core.errors import register_exception_handlers
from app.database import Base, engine
from app.routers import analyze, vocab, auth

settings = get_settings()

Base.metadata.create_all(bind=engine)

def ensure_sqlite_schema():
    if not engine.url.get_backend_name().startswith("sqlite"):
        return

    with engine.begin() as connection:
        columns = {
            row[1]
            for row in connection.execute(text("PRAGMA table_info(vocab_items)"))
        }

        if "user_id" not in columns:
            connection.execute(text("ALTER TABLE vocab_items ADD COLUMN user_id INTEGER"))
            connection.execute(text("CREATE INDEX IF NOT EXISTS ix_vocab_items_user_id ON vocab_items (user_id)"))

ensure_sqlite_schema()

app = FastAPI(
    title=settings.app_name,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

register_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(vocab.router)
app.include_router(analyze.router)

@app.get("/api/health")
def health_check():
    return {"status": "server running"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app.core.config import get_settings
from app.core.errors import register_exception_handlers
from app.database import Base, engine
from app.routers import analyze, vocab

settings = get_settings()

Base.metadata.create_all(bind=engine)

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

app.include_router(vocab.router)
app.include_router(analyze.router)

@app.get("/api/health")
def health_check():
    return {"status": "server running"}
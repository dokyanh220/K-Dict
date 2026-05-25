from enum import StrEnum

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette import status

class ErrorCode(StrEnum):
    VALIDATION_ERROR = "VALIDATION_ERROR"
    VOCAB_NOT_FOUND = "VOCAB_NOT_FOUND"
    VOCAB_DUPLICATED = "VOCAB_DUPLICATED"
    ANALYZE_FAILED = "ANALYZE_FAILED"
    INTERNAL_ERROR = "INTERNAL_ERROR"

def error_response(
    code: ErrorCode,
    message: str,
    details: object | None = None,
):
    response = {
        "error": {
            "code": code,
            "message": message,
        }
    }

    if details is not None:
        response["error"]["details"] = details

    return response

class AppException(HTTPException):
    def __init__(
        self,
        status_code: int,
        code: ErrorCode,
        message: str,
        details: object | None = None,
    ):
        super().__init__(status_code=status_code, detail=message)
        self.code = code
        self.message = message
        self.details = details

def register_exception_handlers(app: FastAPI):
    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content=error_response(
                code=exc.code,
                message=exc.message,
                details=exc.details,
            ),
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError,
    ):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=error_response(
                code=ErrorCode.VALIDATION_ERROR,
                message="Request validation failed",
                details=exc.errors(),
            ),
        )

    @app.exception_handler(Exception)
    async def internal_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_response(
                code=ErrorCode.INTERNAL_ERROR,
                message="Internal server error",
            ),
        )
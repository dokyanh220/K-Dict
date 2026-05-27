# Tài Liệu API K-Dict

Base URL local:

```txt
http://127.0.0.1:8000
```

Swagger:

```txt
http://127.0.0.1:8000/docs
```

## Health

### `GET /api/health`

Response:

```json
{
  "status": "server running"
}
```

## Auth

### `POST /auth/google`

Đăng nhập bằng Google ID token. Backend verify token với `GOOGLE_CLIENT_ID`, tạo hoặc cập nhật user, rồi trả JWT nội bộ cho app.

Request:

```json
{
  "id_token": "google_id_token"
}
```

Response:

```json
{
  "access_token": "jwt",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "K-Dict User",
    "avatar_url": "https://..."
  }
}
```

Các endpoint vocabulary cần header:

```txt
Authorization: Bearer <access_token>
```

## Analyze

### `POST /api/analyze`

Phân tích text tiếng Anh bằng Gemini AI, trả bản dịch tiếng Việt và danh sách item gợi ý để lưu.

Endpoint này hiện không bắt buộc đăng nhập, để người dùng có thể thử phân tích trước rồi đăng nhập khi lưu.

Request:

```json
{
  "text": "I want to improve my coding skills",
  "tags": ["programmer"]
}
```

Validate:

- `text` bắt buộc, dài từ 1 đến 5000 ký tự.
- `tags` optional; nếu không truyền, backend dùng `AI_DEFAULT_TAG`.

Response:

```json
{
  "translated_vi": "Tôi muốn cải thiện kỹ năng lập trình của mình.",
  "input_type": "sentence",
  "items": [
    {
      "text": "improve",
      "type": "word",
      "meaning_vi": "cải thiện",
      "explanation_vi": "Làm cho một kỹ năng hoặc một thứ gì đó trở nên tốt hơn.",
      "example_en": "I want to improve my English speaking skills.",
      "example_vi": "Tôi muốn cải thiện kỹ năng nói tiếng Anh của mình."
    }
  ]
}
```

Ghi chú:

- Backend gọi model theo `AI_MODEL`.
- AI response được yêu cầu trả JSON và validate bằng Pydantic.
- Request Gemini được retry ngắn bằng `tenacity`.
- Nếu provider lỗi, response rỗng, JSON sai hoặc output sai schema, API trả `ANALYZE_FAILED` với HTTP `502`.
- Khi `APP_DEBUG=true`, response lỗi có thể kèm `details` để debug local.

## Vocabulary

Vocabulary item thuộc về user hiện tại qua `user_id`.

Shape response:

```json
{
  "id": 1,
  "text": "improve",
  "type": "word",
  "meaning_vi": "cải thiện",
  "explanation_vi": "Làm cho điều gì đó tốt hơn",
  "example_en": "I want to improve my English.",
  "example_vi": "Tôi muốn cải thiện tiếng Anh của mình.",
  "source_text": "I want to improve my English",
  "note": "Từ hay dùng trong học tập và công việc",
  "created_at": "2026-05-25T13:00:00",
  "updated_at": null
}
```

### `POST /api/vocab`

Tạo vocabulary item mới cho user đang đăng nhập.

Request:

```json
{
  "text": "improve",
  "type": "word",
  "meaning_vi": "cải thiện",
  "explanation_vi": "Làm cho điều gì đó tốt hơn",
  "example_en": "I want to improve my English.",
  "example_vi": "Tôi muốn cải thiện tiếng Anh của mình.",
  "source_text": "I want to improve my English",
  "note": "Từ hay dùng trong học tập và công việc"
}
```

Response thành công: `201 Created`.

Chống trùng:

- Backend normalize `text` bằng trim, lowercase và gom khoảng trắng.
- Trùng chỉ tính trong cùng user và cùng `type`.
- Nếu trùng, API trả `409 Conflict` với code `VOCAB_DUPLICATED`.

### `GET /api/vocab`

Lấy danh sách vocabulary item của user đang đăng nhập.

Query params:

| Param | Kiểu | Mặc định | Ghi chú |
| --- | --- | --- | --- |
| `search` | string | `null` | Tìm trong `text`, `meaning_vi`, `note` |
| `type` | `word`, `phrase`, `sentence` | `null` | Lọc theo loại |
| `page` | integer | `1` | Tối thiểu `1` |
| `limit` | integer | `20` | Từ `1` đến `100` |

Response:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "total_pages": 0
  }
}
```

### `GET /api/vocab/{item_id}`

Lấy chi tiết một vocabulary item. User chỉ truy cập được item của chính mình.

### `PUT /api/vocab/{item_id}`

Cập nhật vocabulary item. Request chỉ cần gửi field muốn thay đổi.

### `DELETE /api/vocab/{item_id}`

Xóa vocabulary item của user hiện tại.

Response:

```json
{
  "message": "Xóa từ vựng thành công"
}
```

## Format Lỗi

`AppException` trả về:

```json
{
  "error": {
    "code": "VOCAB_NOT_FOUND",
    "message": "Không tìm thấy từ vựng"
  }
}
```

Error code:

| Code | HTTP status | Ý nghĩa |
| --- | --- | --- |
| `VALIDATION_ERROR` | 422 | Request body hoặc query params không hợp lệ |
| `VOCAB_NOT_FOUND` | 404 | Không tồn tại vocabulary item hoặc không thuộc user hiện tại |
| `VOCAB_DUPLICATED` | 409 | Vocabulary item đã tồn tại trong sổ của user |
| `ANALYZE_FAILED` | 502 | AI provider hoặc analyze service bị lỗi |
| `INTERNAL_ERROR` | 500 | Lỗi server ngoài dự kiến |

Ghi chú: một vài nhánh `PUT` và `DELETE` vẫn dùng `HTTPException` mặc định khi không tìm thấy item; nên đồng bộ sang `AppException` trong lần cleanup tiếp theo.

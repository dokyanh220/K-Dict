# Tài Liệu API K-Dict

Base URL khi phát triển local:

```txt
http://127.0.0.1:8000
```

Tài liệu tương tác:

```txt
http://127.0.0.1:8000/docs
```

## Health Check

### `GET /api/health`

Kiểm tra backend có đang hoạt động hay không.

Response hiện tại:

```json
{
  "status": "server running"
}
```

## Analyze Text

### `POST /api/analyze`

Phân tích text tiếng Anh và trả về bản dịch tiếng Việt cùng danh sách item gợi ý để lưu.

Trạng thái hiện tại: fake response. Tích hợp AI thật nằm ở Phase 3.

Request:

```json
{
  "text": "I want to improve my English"
}
```

Validate:

- `text` là bắt buộc.
- Độ dài `text` từ 1 đến 5000 ký tự.

Response:

```json
{
  "translated_vi": "Dịch nghĩa: I want to improve my English",
  "input_type": "sentence",
  "items": [
    {
      "text": "I want to improve my English",
      "type": "sentence",
      "meaning_vi": "Nghĩa ví dụ",
      "explanation_vi": "Phần dịch nghĩa AI",
      "example_en": "I want to improve my English",
      "example_vi": "Dịch nghĩa: I want to improve my English"
    }
  ]
}
```

## Vocabulary

Shape của một vocabulary item:

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

`updated_at` đã có trong response schema nhưng model hiện chưa có cột tương ứng, nên giá trị thực tế có thể là `null`.

### `POST /api/vocab`

Tạo một vocabulary item mới.

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

Hành vi chống trùng:

- Backend normalize `text` bằng cách trim, lowercase và gom khoảng trắng.
- Nếu đã tồn tại item cùng `text` sau normalize và cùng `type`, API trả `409 Conflict`.

### `GET /api/vocab`

Lấy danh sách vocabulary item.

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
  "items": [
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
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "total_pages": 1
  }
}
```

### `GET /api/vocab/{item_id}`

Lấy chi tiết một vocabulary item theo ID.

Response thành công:

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

### `PUT /api/vocab/{item_id}`

Cập nhật một vocabulary item theo ID. Request chỉ cần gửi field muốn thay đổi.

Request:

```json
{
  "meaning_vi": "cải thiện, nâng cao",
  "note": "Đã gặp trong tài liệu deploy"
}
```

Response:

```json
{
  "id": 1,
  "text": "improve",
  "type": "word",
  "meaning_vi": "cải thiện, nâng cao",
  "explanation_vi": "Làm cho điều gì đó tốt hơn",
  "example_en": "I want to improve my English.",
  "example_vi": "Tôi muốn cải thiện tiếng Anh của mình.",
  "source_text": "I want to improve my English",
  "note": "Đã gặp trong tài liệu deploy",
  "created_at": "2026-05-25T13:00:00",
  "updated_at": null
}
```

### `DELETE /api/vocab/{item_id}`

Xóa một vocabulary item theo ID.

Response:

```json
{
  "message": "Xóa từ vựng thành công"
}
```

## Format Lỗi

Các lỗi dùng `AppException` sẽ trả về shape:

```json
{
  "error": {
    "code": "VOCAB_NOT_FOUND",
    "message": "Không tìm thấy từ vựng"
  }
}
```

Validation error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": []
  }
}
```

Các error code:

| Code | HTTP status | Ý nghĩa |
| --- | --- | --- |
| `VALIDATION_ERROR` | 422 | Request body hoặc query params không hợp lệ |
| `VOCAB_NOT_FOUND` | 404 | Không tồn tại vocabulary item |
| `VOCAB_DUPLICATED` | 409 | Vocabulary item đã tồn tại |
| `ANALYZE_FAILED` | 502 | AI provider hoặc analyze service bị lỗi |
| `INTERNAL_ERROR` | 500 | Lỗi server ngoài dự kiến |

Ghi chú: một vài nhánh `PUT` và `DELETE` hiện vẫn dùng `HTTPException` mặc định khi không tìm thấy item. Nên đồng bộ sang `AppException` ở lần cleanup tiếp theo.

# K-Dict API

Backend FastAPI cho dự án K-Dict.

## Tính Năng

- API kiểm tra trạng thái hệ thống.
- API CRUD từ vựng.
- Lưu dữ liệu bằng SQLite.
- API analyze dùng Gemini AI để dịch, nhận diện loại input và gợi ý vocabulary.

## Cài Đặt

```bash
cd api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Chạy Server

```bash
uvicorn app.main:app --reload
```

API local:

```txt
http://127.0.0.1:8000
```

Swagger:

```txt
http://127.0.0.1:8000/docs
```

## Xem Database

Không cần cài SQLite CLI. Có thể dùng script Python có sẵn:

```bash
python scripts/showdatabase.py
```

Xem ít dòng hơn:

```bash
python scripts/showdatabase.py --limit 5
```

Xem một bảng cụ thể:

```bash
python scripts/showdatabase.py --table vocab_items
```

Xem toàn bộ bảng:

```bash
python scripts/showdatabase.py --all-tables
```

## Endpoint Chính

| Method | Endpoint | Mục đích |
| --- | --- | --- |
| `GET` | `/api/health` | Kiểm tra API còn hoạt động |
| `POST` | `/api/analyze` | Phân tích text tiếng Anh |
| `GET` | `/api/vocab` | Lấy danh sách từ vựng |
| `POST` | `/api/vocab` | Tạo từ vựng mới |
| `GET` | `/api/vocab/{item_id}` | Lấy chi tiết từ vựng |
| `PUT` | `/api/vocab/{item_id}` | Cập nhật từ vựng |
| `DELETE` | `/api/vocab/{item_id}` | Xóa từ vựng |

## Cấu Hình AI

Backend đọc cấu hình AI từ `.env`:

```txt
AI_PROVIDER=gemini
AI_API_KEY=your_gemini_api_key
AI_MODEL=gemini-3-flash-preview
AI_DEFAULT_TAG=programmer
```

Prompt analyze nằm tại `app/services/ai_prompts.py` để dễ mở rộng tag, output rule và product context.

## Ghi Chú Phát Triển

Các việc nên cleanup ở phase tiếp theo:

1. Thêm test tự động cho API và service.
2. Đồng bộ toàn bộ lỗi router sang `AppException`.
3. Cleanup các text/tài liệu cũ nếu còn lỗi encoding.

Xem thêm:

- [Tài liệu API](docs/API.md)
- [Cấu trúc backend](docs/structure.md)
- [Roadmap](docs/ROADMAP.md)

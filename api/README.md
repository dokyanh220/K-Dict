# K-Dict API

Backend FastAPI cho dự án K-Dict.

## Tính Năng

- API kiểm tra trạng thái hệ thống.
- API CRUD từ vựng.
- Lưu dữ liệu bằng SQLite.
- API analyze giả lập để frontend có thể phát triển sớm.

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

## Ghi Chú Phát Triển

Trước khi làm frontend, backend nên hoàn thiện các việc sau:

1. Đồng bộ `schemas.py` với `models.py`.
2. Hoàn thiện `requirements.txt`.
3. Sửa lỗi encoding tiếng Việt trong fake analyze response.
4. Thêm kiểm tra dữ liệu trùng.
5. Thêm phân trang.
6. Thêm test.

Xem thêm:

- [Tài liệu API](docs/API.md)
- [Cấu trúc backend](docs/structure.md)
- [Roadmap](docs/ROADMAP.md)

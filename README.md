# K-Dict

K-Dict là ứng dụng từ điển tiếng Anh cá nhân, dùng để phân tích text tiếng Anh, lưu từ vựng/cụm từ/câu, ghi nghĩa tiếng Việt, ví dụ và ghi chú cá nhân.

Dự án hiện đã hoàn thành Phase 2: backend FastAPI + SQLite và frontend React/Vite MVP chạy local.

## Mục Tiêu

- Lưu từ vựng, cụm từ và câu tiếng Anh.
- Dịch hoặc giải thích nội dung tiếng Anh sang tiếng Việt.
- Lưu ví dụ, ghi chú và ngữ cảnh sử dụng.
- Tìm kiếm, lọc và quản lý sổ từ vựng cá nhân.
- Chuẩn bị tích hợp AI thật ở Phase 3.

## Công Nghệ

| Tầng | Công nghệ |
| --- | --- |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | SQLite |
| Frontend | React + Vite |
| Styling | TailwindCSS + shadcn/ui |
| Deploy | Ubuntu VPS, Nginx, Docker Compose ở phase sau |
| CI/CD | GitHub Actions ở phase sau |

## Cấu Trúc Dự Án

```txt
K-Dict/
+-- api/
|   +-- app/
|   |   +-- core/
|   |   +-- routers/
|   |   +-- database.py
|   |   +-- main.py
|   |   +-- models.py
|   |   +-- schemas.py
|   +-- data/
|   +-- scripts/
|   +-- requirements.txt
+-- client/
|   +-- public/
|   +-- src/
|   |   +-- api/
|   |   +-- components/
|   |   +-- layouts/
|   |   +-- pages/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   +-- package.json
|   +-- vite.config.js
+-- docs/
|   +-- API.md
|   +-- ROADMAP.md
|   +-- structure.md
+-- README.md
```

## Chạy Backend Local

```bash
cd api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend chạy tại:

```txt
http://127.0.0.1:8000
```

URL hữu ích:

- Health check: `GET /api/health`
- Swagger docs: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Chạy Frontend Local

```bash
cd client
npm install
npm run dev
```

Frontend mặc định chạy tại:

```txt
http://localhost:5173
```

## Tài Liệu

- [Cấu trúc dự án](docs/structure.md)
- [Tài liệu API](docs/API.md)
- [Roadmap](docs/ROADMAP.md)

## Trạng Thái Hiện Tại

Đã có:

- Backend FastAPI kết nối SQLite.
- CRUD vocabulary.
- Tìm kiếm, lọc theo loại và phân trang.
- Chống trùng vocabulary item.
- Format lỗi nghiệp vụ dùng chung.
- Analyze endpoint với fake response.
- Frontend React/Vite MVP.
- Trang Analyze để phân tích text và lưu item gợi ý.
- Trang Dictionary để tìm kiếm, lọc, phân trang và xóa từ đã lưu.

Cần làm tiếp:

- Tích hợp AI thật cho analyze ở Phase 3.
- Cleanup lỗi encoding tiếng Việt còn sót trong source.
- Thêm test backend.
- Thêm biến môi trường frontend cho API base URL.
- Đồng bộ toàn bộ lỗi 404 sang `AppException`.

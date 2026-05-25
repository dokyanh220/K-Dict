# Cấu Trúc Dự Án K-Dict

Tài liệu này mô tả cấu trúc hiện tại của K-Dict sau Phase 2. Dự án gồm backend FastAPI, frontend React/Vite, tài liệu kỹ thuật và database SQLite local.

## Tổng Quan

```txt
K-Dict/
+-- api/                 Backend FastAPI
+-- client/              Frontend React + Vite
+-- docs/                Tài liệu dự án
+-- README.md            Giới thiệu và hướng dẫn chạy nhanh
+-- .gitignore
```

## Backend: `api/`

```txt
api/
+-- app/
|   +-- core/
|   |   +-- config.py
|   |   +-- errors.py
|   +-- routers/
|   |   +-- analyze.py
|   |   +-- vocab.py
|   +-- database.py
|   +-- main.py
|   +-- models.py
|   +-- schemas.py
+-- data/
|   +-- vocab.db
+-- scripts/
|   +-- showdatabase.py
+-- requirements.txt
+-- README.md
```

### `app/main.py`

Entrypoint của backend.

- Tạo instance FastAPI.
- Đăng ký CORS theo cấu hình trong `.env`.
- Đăng ký exception handler dùng chung.
- Tạo bảng database khi chạy local.
- Gắn router vocabulary và analyze.
- Cung cấp `GET /api/health`.

### `app/core/config.py`

Quản lý cấu hình runtime bằng `pydantic-settings`.

- `app_name`, `app_env`, `app_debug`.
- `database_url`, mặc định là `sqlite:///./data/vocab.db`.
- `cors_origins`, mặc định hỗ trợ frontend Vite ở `localhost:5173`.
- `ai_provider`, `ai_api_key` để chuẩn bị cho Phase 3.

### `app/core/errors.py`

Chuẩn hóa response lỗi nghiệp vụ.

Shape lỗi:

```json
{
  "error": {
    "code": "VOCAB_DUPLICATED",
    "message": "Từ vựng đã tồn tại"
  }
}
```

Các mã lỗi hiện có: `VALIDATION_ERROR`, `VOCAB_NOT_FOUND`, `VOCAB_DUPLICATED`, `ANALYZE_FAILED`, `INTERNAL_ERROR`.

### `app/database.py`

Thiết lập SQLAlchemy.

- Tạo engine từ `settings.database_url`.
- Tạo `SessionLocal`.
- Cung cấp base class `Base`.
- Cung cấp dependency `get_db()` cho router.

### `app/models.py`

Chứa SQLAlchemy model `VocabItem`.

| Field | Mục đích |
| --- | --- |
| `id` | Khóa chính |
| `text` | Từ, cụm từ hoặc câu tiếng Anh |
| `type` | `word`, `phrase` hoặc `sentence` |
| `meaning_vi` | Nghĩa tiếng Việt |
| `explanation_vi` | Giải thích tiếng Việt, optional |
| `example_en` | Ví dụ tiếng Anh, optional |
| `example_vi` | Bản dịch ví dụ, optional |
| `source_text` | Ngữ cảnh gốc, optional |
| `note` | Ghi chú cá nhân, optional |
| `created_at` | Thời điểm tạo |

### `app/schemas.py`

Chứa Pydantic schema cho API contract.

- `VocabCreate`
- `VocabUpdate`
- `VocabResponse`
- `PaginationMeta`
- `VocabListResponse`
- `VocabType`

Schema hiện đã thống nhất với model bằng field `meaning_vi`.

### `app/routers/vocab.py`

Router quản lý sổ từ vựng cá nhân.

Endpoint hiện có:

- `POST /api/vocab`
- `GET /api/vocab`
- `GET /api/vocab/{item_id}`
- `PUT /api/vocab/{item_id}`
- `DELETE /api/vocab/{item_id}`

Tính năng đã có:

- Tạo vocabulary item.
- Chặn trùng theo `text` sau normalize và `type`.
- Tìm kiếm theo `text`, `meaning_vi`, `note`.
- Lọc theo `type`.
- Phân trang bằng `page` và `limit`.
- Lấy chi tiết, cập nhật và xóa item.

### `app/routers/analyze.py`

Router phân tích text tiếng Anh.

- Nhận input tiếng Anh qua `POST /api/analyze`.
- Trả về `translated_vi`, `input_type` và danh sách item gợi ý để lưu.
- Hiện vẫn dùng fake response. AI thật sẽ được tích hợp ở Phase 3.

## Frontend: `client/`

```txt
client/
+-- components.json
+-- postcss.config.js
+-- tailwind.config.js
+-- public/
|   +-- favicon.svg
|   +-- icons.svg
|   +-- parroto_mascot.png
+-- src/
|   +-- api/
|   |   +-- vocabApi.js
|   +-- assets/
|   |   +-- hero.png
|   |   +-- react.svg
|   |   +-- vite.svg
|   +-- components/
|   |   +-- ui/
|   |   +-- AnalyzeForm.jsx
|   |   +-- AnalyzeResult.jsx
|   |   +-- AuthModal.jsx
|   |   +-- Header.jsx
|   |   +-- SearchBar.jsx
|   |   +-- TypeFilter.jsx
|   |   +-- VocabCard.jsx
|   |   +-- VocabList.jsx
|   +-- layouts/
|   |   +-- MainLayout.jsx
|   +-- lib/
|   |   +-- utils.js
|   +-- pages/
|   |   +-- AnalyzePage.jsx
|   |   +-- DictionaryPage.jsx
|   +-- App.css
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- package.json
+-- vite.config.js
```

### `src/App.jsx`

Quản lý state cấp ứng dụng:

- Trang hiện tại: `analyze` hoặc `dictionary`.
- Trạng thái modal đăng nhập.
- Trạng thái thu gọn sidebar.
- Search keyword truyền từ header sang trang dictionary.

### `src/layouts/MainLayout.jsx`

Layout chính của frontend.

- Sidebar điều hướng.
- Header.
- Khu vực render page.
- Nút đăng nhập và nút thu gọn sidebar.

### `tailwind.config.js`, `postcss.config.js`, `components.json`

Cấu hình TailwindCSS và shadcn/ui.

- `tailwind.config.js`: khai báo content scan, theme token và CSS variables theo style shadcn.
- `postcss.config.js`: bật TailwindCSS và Autoprefixer trong pipeline Vite.
- `components.json`: metadata để tiếp tục thêm shadcn component về sau.

### `src/lib/utils.js`

Chứa helper `cn()` dùng `clsx` và `tailwind-merge`, theo pattern mặc định của shadcn/ui.

### `src/components/ui/`

Chứa các primitive shadcn/ui local đang dùng:

- `button.jsx`
- `card.jsx`
- `input.jsx`
- `textarea.jsx`
- `badge.jsx`
- `dialog.jsx`

### `src/api/vocabApi.js`

Wrapper gọi API backend.

- `analyzeText(text)`
- `getVocab({ search, type, page, limit })`
- `saveVocab(vocabData)`
- `deleteVocab(itemId)`

Base URL hiện tại: `http://127.0.0.1:8000`.

### `src/pages/AnalyzePage.jsx`

Trang phân tích text.

- Gửi text đến `POST /api/analyze`.
- Hiển thị kết quả dịch và item gợi ý.
- Lưu từng item vào sổ từ.
- Đánh dấu item đã lưu hoặc đang lưu.
- Tải trước danh sách từ đã có để tránh lưu trùng trên UI.

### `src/pages/DictionaryPage.jsx`

Trang sổ từ vựng cá nhân.

- Tải danh sách từ từ `GET /api/vocab`.
- Tìm kiếm có debounce.
- Lọc theo `word`, `phrase`, `sentence`.
- Phân trang.
- Xóa item.

### `src/components/`

Các component giao diện nhỏ:

- `AnalyzeForm.jsx`: form nhập text.
- `AnalyzeResult.jsx`: hiển thị kết quả analyze và nút lưu.
- `AuthModal.jsx`: modal đăng nhập ở mức UI.
- `Header.jsx`: thanh header và search nhanh.
- `SearchBar.jsx`: input tìm kiếm.
- `TypeFilter.jsx`: bộ lọc loại từ.
- `VocabCard.jsx`: card hiển thị một vocabulary item.
- `VocabList.jsx`: danh sách vocabulary item.

## Tài Liệu: `docs/`

```txt
docs/
+-- API.md
+-- ROADMAP.md
+-- structure.md
```

- `API.md`: contract API hiện tại.
- `ROADMAP.md`: kế hoạch phát triển theo phase.
- `structure.md`: cấu trúc dự án và trách nhiệm từng phần.

## Ghi Chú Hiện Trạng

- Backend và frontend đã hoàn thành MVP ở mức chạy local.
- Analyze vẫn là fake response, chưa dùng AI provider thật.
- Frontend hiện dùng TailwindCSS + shadcn/ui. `App.css` chỉ còn là placeholder mỏng.
- Một số text tiếng Việt trong code cũ đang bị lỗi encoding, nên cần cleanup ở phase bảo trì gần nhất.
- `client/node_modules`, `client/dist`, `__pycache__` và database local không nên được mô tả như source chính của dự án.

# Cấu Trúc Dự Án K-Dict

Tài liệu này mô tả cấu trúc hiện tại của K-Dict sau khi bổ sung Google auth, vocabulary theo user, Gemini analyze, Profile và Exercises.

## Tổng Quan

```txt
K-Dict/
+-- api/                 Backend FastAPI
+-- client/              Frontend React + Vite
+-- docs/                Tài liệu dự án
+-- README.md            Hướng dẫn chạy nhanh và ảnh demo
+-- .gitignore
```

## Backend: `api/`

```txt
api/
+-- app/
|   +-- core/
|   |   +-- config.py
|   |   +-- errors.py
|   |   +-- security.py
|   +-- models/
|   |   +-- __init__.py
|   |   +-- users.py
|   |   +-- vocab_item.py
|   +-- routers/
|   |   +-- analyze.py
|   |   +-- auth.py
|   |   +-- vocab.py
|   +-- services/
|   |   +-- ai_prompts.py
|   |   +-- ai_service.py
|   |   +-- analyze_service.py
|   |   +-- auth_service.py
|   +-- database.py
|   +-- main.py
|   +-- schemas.py
+-- data/
|   +-- vocab.db
+-- scripts/
|   +-- showdatabase.py
+-- requirements.txt
+-- README.md
```

### `app/main.py`

- Tạo FastAPI app.
- Đăng ký CORS theo `.env`.
- Đăng ký exception handlers.
- Tạo bảng database khi chạy local.
- Bổ sung migration nhẹ cho SQLite để thêm `vocab_items.user_id` nếu DB cũ chưa có.
- Gắn router `auth`, `vocab`, `analyze`.
- Cung cấp `GET /api/health`.

### `app/core/config.py`

Quản lý cấu hình runtime bằng `pydantic-settings`.

- App: `app_name`, `app_env`, `app_debug`.
- Database: `database_url`.
- CORS: `cors_origins`.
- AI: `ai_provider`, `ai_api_key`, `ai_model`, `ai_default_tag`.
- Auth: `GOOGLE_CLIENT_ID`, `JWT_SECRET_KEY`, `JWT_ALGORITHM`, `JWT_EXPIRE_MINUTES`.

### `app/core/security.py`

- Đọc Bearer token từ request.
- Decode JWT bằng cấu hình trong `.env`.
- Tải user hiện tại từ database.
- Trả `401` khi token sai hoặc user không tồn tại.

### `app/models/`

`users.py`:

- Lưu thông tin user Google: `google_sub`, `email`, `name`, `avatar_url`, `provider`.
- Lưu timestamp tạo, cập nhật và lần đăng nhập gần nhất.

`vocab_item.py`:

- Lưu vocabulary item.
- Có `user_id` để tách dữ liệu theo từng user.

### `app/routers/auth.py`

- `POST /auth/google`
- Verify Google ID token.
- Tạo hoặc cập nhật user.
- Trả JWT nội bộ cho frontend.

### `app/routers/vocab.py`

Router quản lý sổ từ vựng cá nhân.

- `POST /api/vocab`
- `GET /api/vocab`
- `GET /api/vocab/{item_id}`
- `PUT /api/vocab/{item_id}`
- `DELETE /api/vocab/{item_id}`

Tất cả endpoint vocabulary hiện yêu cầu user đăng nhập và chỉ thao tác trên item có `user_id` khớp user hiện tại.

### `app/routers/analyze.py`

- `POST /api/analyze`
- Nhận text tiếng Anh và optional `tags`.
- Gọi `AnalyzeService`.
- Trả `ANALYZE_FAILED` với HTTP `502` khi AI provider hoặc validate output lỗi.
- Log lỗi gốc để debug local.

### `app/services/ai_service.py`

- Làm sạch input text.
- Normalize tags, fallback về `ai_default_tag`.
- Gọi Gemini bằng `google-genai`.
- Parse JSON response, xử lý code fence nếu có.
- Retry ngắn với `tenacity` cho lỗi provider/response transient.

### `app/services/analyze_service.py`

- Gọi AI service.
- Validate output bằng Pydantic model nội bộ.
- Retry ngắn nếu response AI lệch schema tạm thời.
- Chuyển lỗi thành `AnalyzeServiceError`.

### `app/services/auth_service.py`

- Verify Google ID token.
- Tạo JWT access token.

## Frontend: `client/`

```txt
client/
+-- public/
+-- src/
|   +-- api/
|   |   +-- authApi.js
|   |   +-- vocabApi.js
|   +-- components/
|   |   +-- ui/
|   |   +-- AnalyzeForm.jsx
|   |   +-- AnalyzeResult.jsx
|   |   +-- AuthModal.jsx
|   |   +-- Header.jsx
|   |   +-- LogoutModal.jsx
|   |   +-- SearchBar.jsx
|   |   +-- Sidebar.jsx
|   |   +-- TypeFilter.jsx
|   |   +-- VocabCard.jsx
|   |   +-- VocabList.jsx
|   |   +-- icons.jsx
|   +-- hooks/
|   |   +-- useAuth.js
|   +-- layouts/
|   |   +-- MainLayout.jsx
|   +-- lib/
|   |   +-- axios.js
|   |   +-- utils.js
|   +-- pages/
|   |   +-- AnalyzePage.jsx
|   |   +-- DictionaryPage.jsx
|   |   +-- ExercisesPage.jsx
|   |   +-- ProfilePage.jsx
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- package.json
+-- vite.config.js
```

### `src/main.jsx`

- Bọc app bằng `GoogleOAuthProvider`.
- Đọc `VITE_GOOGLE_CLIENT_ID`.

### `src/hooks/useAuth.js`

- Lưu token và user vào `localStorage`.
- Cung cấp `login`, `logout`, `isAuthenticated`.
- Lắng nghe event `auth:logout` từ Axios interceptor khi backend trả `401`.

### `src/lib/axios.js`

- Tạo Axios instance với base URL backend.
- Tự gắn `Authorization: Bearer <token>`.
- Xóa local auth và phát event logout khi gặp `401`.
- Chuẩn hóa message lỗi cho UI.

### `src/App.jsx`

- Quản lý page hiện tại: `analyze`, `dictionary`, `exercises`, `profile`.
- Chặn truy cập các page cá nhân nếu chưa đăng nhập.
- Mở auth modal khi user cần đăng nhập.
- Truyền user/auth state xuống layout và page.

### `src/pages/AnalyzePage.jsx`

- Cho phép analyze khi chưa đăng nhập.
- Khi đã đăng nhập, tải vocab hiện có để đánh dấu item đã lưu.
- Khi lưu item mà chưa đăng nhập, mở modal đăng nhập.

### `src/pages/DictionaryPage.jsx`

- Yêu cầu đăng nhập.
- Tải vocab của user hiện tại từ `GET /api/vocab`.
- Tìm kiếm, lọc theo type, phân trang và xóa item.

### `src/pages/ProfilePage.jsx`

- Hiển thị hồ sơ Google.
- Hiển thị tổng số từ đã lưu và các chỉ số học tập.
- Hiển thị các từ mới lưu gần đây.
- Có quick settings cho thông báo và dark theme.

### `src/pages/ExercisesPage.jsx`

- Màn hình luyện tập tĩnh phía client.
- Có quiz, flashcard, bài luyện code và danh sách từ hay quên.
- Có tương tác chọn đáp án, lật thẻ, đánh dấu đã thuộc và phát âm.

## Docs

```txt
docs/
+-- API.md
+-- ROADMAP.md
+-- structure.md
+-- assets/
```

- `API.md`: contract API hiện tại.
- `ROADMAP.md`: kế hoạch phát triển và ghi chú review.
- `structure.md`: cấu trúc dự án và trách nhiệm từng module.
- `assets/`: ảnh demo dùng trong README.

# Roadmap K-Dict

Roadmap này mô tả trạng thái hiện tại và các việc tiếp theo của K-Dict.

## Phase 1: Backend Core (Hoàn Thành)

- FastAPI app.
- SQLite qua SQLAlchemy.
- Runtime config bằng `app/core/config.py`.
- Exception format dùng chung.
- Health check.
- Vocabulary CRUD.
- Search, filter, pagination.
- Duplicate check theo text normalize và type.
- Script xem database local.

## Phase 2: Frontend MVP (Hoàn Thành)

- React + Vite frontend.
- Layout với sidebar, header và content area.
- Trang Analyze.
- Trang Dictionary.
- TailwindCSS + shadcn/ui primitives.
- Axios wrapper gọi backend.
- Search nhanh từ header.

## Phase 3: AI Analyze (Hoàn Thành)

- Tách `AnalyzeService`.
- Tách `AIService`.
- Tách prompt sang `ai_prompts.py`.
- Gọi Gemini API thật.
- Ép AI trả JSON.
- Validate output bằng Pydantic.
- Parse code fence nếu provider trả markdown.
- Retry ngắn cho lỗi provider/response tạm thời.
- Trả lỗi chuẩn `ANALYZE_FAILED`.

## Phase 3.1: Auth Và Dữ Liệu Theo User (Đang Hoàn Thiện)

Đã có:

- Google Login frontend qua `@react-oauth/google`.
- `POST /auth/google` backend.
- Bảng `users`.
- JWT access token.
- `get_current_user` dependency.
- `vocab_items.user_id`.
- CRUD vocab chỉ thao tác trên dữ liệu của user hiện tại.
- Axios interceptor tự gắn token và logout khi gặp `401`.
- UI yêu cầu đăng nhập khi mở Dictionary, Exercises, Profile hoặc khi lưu vocab.

Cần hoàn thiện:

- Thêm `GET /auth/me` nếu frontend cần verify session khi reload.
- Thêm migration chính thức thay cho migration SQLite nhẹ trong `main.py`.
- Backfill owner cho dữ liệu cũ ngoài các dòng đã cập nhật thủ công.
- Đồng bộ `PUT` và `DELETE` not-found sang `AppException`.
- Thêm test auth và permission.
- Đăng nhập qua email, smtp gửi link đăng nhập qua email:
    - Email register
    - Magic link login
    - GitHub login
    - Device sessions
    - Session revoke

Test cần có:

- Login Google token hợp lệ.
- Login Google token sai.
- User chỉ thấy vocab của mình.
- User không update/delete vocab của user khác.
- Duplicate vocab tính theo từng user.
- Request không token vào `/api/vocab` bị chặn.

## Phase 3.2: Profile Và Exercises (Prototype)

Đã có:

- Trang Profile đọc user Google từ auth state.
- Card thống kê tổng số từ, đã thuộc, streak, accuracy.
- Danh sách từ mới lưu gần đây.
- Quick settings cho thông báo và theme.
- Trang Exercises với quiz, flashcard, code practice và weak words.

Cần hoàn thiện:

- Lưu tiến độ học thật vào backend.
- Tạo API cho quiz/flashcard theo vocab của user.
- Thay số liệu tĩnh bằng dữ liệu thật.
- Lưu streak, XP, accuracy.

## Review Gần Nhất

Findings:
- `client/src/hooks/useAuth.js` dùng `JSON.parse(storedUser)` mà không bắt lỗi. Nếu localStorage bị hỏng, app có thể crash lúc load.

## Phase 4: Tối Ưu Dữ Liệu

- Thêm `updated_at` thật trong model/database.
- Thêm tags cho vocab item.
- Thêm ghi chú cá nhân nâng cao.
- Thêm export JSON/CSV.
- Thêm command hoặc endpoint backup database.
- Thêm index tìm kiếm.
- Thêm test backend.

## Phase 5: Deploy VPS

- Dockerfile backend.
- Dockerfile frontend.
- `docker-compose.yml`.
- Nginx reverse proxy.
- Domain và SSL.
- Runtime `.env`.
- Lưu SQLite bằng Docker volume hoặc chuyển sang Postgres.

## Phase 6: CI/CD

- GitHub repository.
- GitHub Actions workflow.
- SSH deploy key hoặc secret.
- Pull source mới trên VPS.
- Build lại image.
- Restart container.

## Phase 7: Bảo Mật Và Bảo Trì

- Không commit API key, JWT secret hoặc database thật.
- Giới hạn CORS origins.
- Rate limit các API nhạy cảm.
- Validate input đầy đủ.
- Backup database định kỳ.
- Log lỗi quan trọng bằng logger chuẩn.
- Rà soát encoding UTF-8 khi chỉnh sửa trên Windows để tránh lỗi hiển thị trong terminal cũ.

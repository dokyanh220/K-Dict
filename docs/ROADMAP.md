# Roadmap K-Dict

Roadmap này mô tả hướng phát triển của K-Dict theo từng phase. Mỗi phase nên để lại một phiên bản chạy được, có giá trị sử dụng rõ ràng trước khi chuyển sang phase tiếp theo.

## Phase 1: Backend Core (Hoàn thành)

Mục tiêu: xây dựng API local ổn định để lưu, truy xuất và quản lý từ vựng.

Đã hoàn thành:

- Tạo ứng dụng FastAPI.
- Cấu hình SQLite qua SQLAlchemy.
- Thêm cấu hình runtime bằng `app/core/config.py`.
- Thêm chuẩn lỗi bằng `app/core/errors.py`.
- Thêm health check route.
- Thêm vocabulary router.
- Thêm analyze router với fake response.
- Đồng bộ schema với model bằng field `meaning_vi`.
- Thêm CRUD vocabulary: create, list, detail, update, delete.
- Thêm chống trùng theo `text` normalize và `type`.
- Thêm tìm kiếm theo `text`, `meaning_vi`, `note`.
- Thêm filter theo `type`.
- Thêm phân trang cho `GET /api/vocab`.
- Hoàn thiện `requirements.txt`.
- Thêm script `api/scripts/showdatabase.py` để xem dữ liệu local.

Checklist hoàn thành:

- `GET /api/health` trả về trạng thái server.
- `POST /api/vocab` lưu được từ, cụm từ hoặc câu.
- Dữ liệu trùng được xử lý bằng `409 Conflict`.
- `GET /api/vocab?page=1&limit=20` trả về dữ liệu có phân trang.
- `GET /api/vocab?search=improve&type=word` hoạt động.
- Lỗi validation và lỗi nghiệp vụ có format rõ ràng.

## Phase 2: Frontend MVP (Hoàn thành)

Mục tiêu: xây dựng giao diện React/Vite để người dùng phân tích text, lưu item gợi ý và quản lý sổ từ vựng cá nhân.

Đã hoàn thành:

- Thiết lập frontend bằng React + Vite trong thư mục `client`.
- Tạo layout chính với sidebar, header và vùng nội dung.
- Tạo điều hướng nội bộ giữa trang Analyze và Dictionary.
- Tạo trang Analyze để nhập text tiếng Anh.
- Kết nối frontend với `POST /api/analyze`.
- Hiển thị bản dịch tiếng Việt và danh sách item gợi ý từ analyze response.
- Thêm nút lưu cho từng item gợi ý.
- Kết nối lưu item với `POST /api/vocab`.
- Tải danh sách từ đã lưu để đánh dấu item đã tồn tại trên UI.
- Tạo trang Dictionary để xem sổ từ vựng cá nhân.
- Kết nối danh sách với `GET /api/vocab`.
- Thêm tìm kiếm từ header và trong trang dictionary.
- Thêm filter theo `word`, `phrase`, `sentence`.
- Thêm phân trang phía frontend.
- Thêm xóa vocabulary item qua `DELETE /api/vocab/{item_id}`.
- Thêm modal đăng nhập ở mức giao diện.
- Chuyển style MVP sang TailwindCSS + shadcn/ui.

Màn hình đã có:

- Trang phân tích và dịch text.
- Khu vực hiển thị kết quả analyze.
- Danh sách item gợi ý để lưu.
- Trang sổ từ vựng cá nhân.
- Thanh tìm kiếm nhanh.
- Bộ lọc loại vocabulary.
- Phân trang dictionary.
- Modal đăng nhập UI.

Ghi chú kỹ thuật:

- Frontend đang gọi backend tại `http://127.0.0.1:8000`.
- Giao diện hiện dùng TailwindCSS + shadcn/ui; `App.css` chỉ còn placeholder.
- Modal đăng nhập mới là UI, chưa có authentication backend.
- Một số chuỗi tiếng Việt trong source đang bị lỗi encoding và cần cleanup.

## Phase 3: AI Analyze (Hoàn thành)

Mục tiêu: thay fake analyze bằng service dùng AI.

Đã làm:
- Tạo `app/services/analyze_service.py`.
- Tạo `app/services/ai_service.py`.
- Tách prompt và tag context sang `app/services/ai_prompts.py`.
- Cấu hình provider qua `.env`.
- Kết nối Gemini API.
- Yêu cầu AI trả về JSON nghiêm ngặt.
- Validate output từ AI bằng Pydantic.
- Parse response JSON và xử lý trường hợp provider trả kèm code fence.
- Đồng bộ route analyze để trả lỗi `ANALYZE_FAILED` khi provider hoặc validate lỗi.
- Gọi API Gemini và response ok:
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
        },
        {
            "text": "coding skills",
            "type": "phrase",
            "meaning_vi": "kỹ năng lập trình",
            "explanation_vi": "Khả năng viết mã nguồn (code) để tạo ra các chương trình hoặc ứng dụng.",
            "example_en": "Practicing every day is the best way to build coding skills.",
            "example_vi": "Luyện tập mỗi ngày là cách tốt nhất để xây dựng kỹ năng lập trình."
        },
        {
            "text": "coding",
            "type": "word",
            "meaning_vi": "việc lập trình / viết mã",
            "explanation_vi": "Hành động viết các dòng lệnh để máy tính thực hiện một công việc nào đó.",
            "example_en": "I started learning coding when I was twelve.",
            "example_vi": "Tôi bắt đầu học lập trình khi tôi 12 tuổi."
        },
        {
            "text": "skills",
            "type": "word",
            "meaning_vi": "kỹ năng",
            "explanation_vi": "Những khả năng hoặc kiến thức chuyên môn bạn có được qua học tập và rèn luyện.",
            "example_en": "Problem-solving is one of the most important skills for a developer.",
            "example_vi": "Giải quyết vấn đề là một trong những kỹ năng quan trọng nhất đối với một lập trình viên."
        }
    ]
}
```
Ghi chú kỹ thuật:

- Prompt chính nằm trong `api/app/services/ai_prompts.py`.
- `AI_DEFAULT_TAG` được dùng khi request không truyền `tags`.
- Frontend đã có thể gọi `POST /api/analyze`; lỗi analyze từ backend có mã `ANALYZE_FAILED`.

## Phase 4: Tối Ưu Dữ Liệu

Mục tiêu: giúp kho từ điển cá nhân dễ tổ chức, lọc và xuất dữ liệu.

Việc cần làm:

- Thêm `updated_at`.
- Thêm tag.
- Thêm ghi chú cá nhân nâng cao.
- Thêm export JSON.
- Thêm export CSV.
- Thêm command hoặc endpoint backup database.
- Thêm index để tìm kiếm nhanh hơn.
- Bổ sung test cho create, list, duplicate, update, delete.

## Phase 5: Deploy VPS

Mục tiêu: deploy ứng dụng lên Ubuntu VPS.

Việc cần làm:

- Tạo Dockerfile cho backend.
- Tạo Dockerfile cho frontend.
- Tạo `docker-compose.yml`.
- Cấu hình Nginx reverse proxy.
- Cấu hình domain.
- Cấu hình SSL HTTPS.
- Lưu biến runtime trong `.env`.
- Lưu file SQLite bằng Docker volume.

Kiến trúc deploy mục tiêu:

```txt
User
  |
HTTPS Domain
  |
Nginx
  +-- React frontend
  +-- FastAPI backend
        |
      SQLite
```

## Phase 6: CI/CD

Mục tiêu: tự động deploy sau khi push code lên GitHub.

Việc cần làm:

- Tạo GitHub repository.
- Thêm GitHub Actions workflow.
- Thêm SSH deploy key hoặc secret.
- SSH vào VPS.
- Pull source mới nhất.
- Build lại Docker image.
- Restart container.

Luồng CI/CD mục tiêu:

```txt
Git push
  |
GitHub Actions
  |
SSH VPS
  |
git pull
  |
docker compose up -d --build
```

## Phase 7: Bảo Mật Và Bảo Trì

Mục tiêu: giúp ứng dụng an toàn hơn khi chạy public.

Việc cần làm:

- Dùng `.env` cho secret và config.
- Không commit API key.
- Giới hạn CORS origins.
- Thêm rate limiting cho API.
- Validate toàn bộ input.
- Thêm backup database định kỳ.
- Giữ file SQLite ở nơi private.
- Thêm log cho lỗi quan trọng.
- Thêm cấu hình production cho FastAPI và Nginx.
- Cleanup lỗi encoding tiếng Việt trong source và tài liệu cũ.

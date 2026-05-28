from sqlalchemy.orm import Session

from app.models import User, AuthProvider

def get_or_create_user_by_provider(
    db: Session,
    *, # lấy tham số là dict dạng key=value | ví dụ: {email="e@gmail.com", provider="google"}
    email: str,
    provider: str,
    provider_user_id: str,
    name: str | None = None,
    avatar_url: str | None = None     
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        user = User(
            email=email,
            name=name,
            avatar_url=avatar_url,
        )

        db.add(user)
        db.flush() # flush() là ghi danh còn commit() là hoàn thành đăng ký luôn

    provider_link = db.query(AuthProvider).filter(
        AuthProvider.provider == provider,
        AuthProvider.provider_user_id == provider_user_id
    ).first()

    if not provider_link:
        provider_link = AuthProvider(
            user_id=user.id,
            provider=provider,
            provider_user_id=provider_user_id
        )

        db.add(provider_link)

    if name and not user.name:
        user.name = name

    if avatar_url and not user.avatar_url:
        user.avatar_url = avatar_url

    db.commit()
    db.refresh(user)

    return user
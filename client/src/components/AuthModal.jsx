import { useState } from 'react'

import { Button } from './ui/button'
import { Apple, Mail } from './icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  )
}

function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      alert('Vui lòng nhập email!')
      return
    }

    alert(`Đăng nhập thành công (Demo) với email: ${email.trim()}`)
    setEmail('')
    onClose()
  }

  const handleSocialClick = (platform) => {
    alert(`Đăng nhập thành công (Demo) bằng tài khoản ${platform}!`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md overflow-hidden p-0 card-elevated">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <span className="font-headline text-xl font-bold text-primary">K</span>
            </div>
            <DialogTitle className="font-headline text-xl">Chào mừng trở lại</DialogTitle>
            <DialogDescription>
              Tiếp tục hành trình học tiếng Anh cùng K-Dict.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialClick('Google')}
              className="h-11 gap-3 bubble-up"
            >
              <GoogleIcon />
              Tiếp tục với Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialClick('Apple')}
              className="h-11 gap-3 bubble-up"
            >
              <Apple className="h-4 w-4" />
              Tiếp tục với Apple
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
            <span className="text-[11px] font-label uppercase tracking-widest text-muted-foreground">Hoặc</span>
            <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
          </div>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 focus-glow"
              required
            />
            <Button type="submit" className="h-11 gap-2 bubble-up">
              <Mail className="h-4 w-4" />
              Tiếp tục với email
            </Button>
          </form>

          <p className="mt-6 text-center text-[11px] leading-5 text-muted-foreground">
            Bằng cách đăng nhập, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của chúng tôi.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal

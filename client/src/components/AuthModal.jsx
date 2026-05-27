import { useState } from 'react'

import { Button } from './ui/button'
import { Mail } from './icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { authApi } from '../api/authApi'
import { GoogleLogin } from '@react-oauth/google'

function AuthModal({ isOpen, onClose, onLogin }) {
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

  const handleGoogleLogin = async res => {
    try {
      const idToken = res?.credential

      if (!idToken) {
        console.error('Missing Google credential')
        return
      }

      const authData = await authApi.loginWithGoogle(idToken)

      onLogin(authData)
      onClose()
    } catch (error) {
      console.error(error.response?.data || error)
    }
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
            <div className="overflow-hidden rounded-md">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log('Login Failed')}
                width={320}
                text="continue_with"
                shape="rectangular"
              />
            </div>
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

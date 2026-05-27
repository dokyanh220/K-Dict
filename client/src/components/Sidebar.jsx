import { useState } from 'react'
import { BookOpen, ChevronRight, LogIn, PanelLeftClose, Wand2, Dumbbell } from './icons'
import { cn } from '../lib/utils'
import LogoutModal from './LogoutModal'

function Sidebar({
  currentPage,
  onPageChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenAuth,
  user,
  isAuthenticated,
  onLogout
}) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  const getSidebarButtonClass = (isActive) => cn(
    'w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-300 ease-out-expo text-sm font-medium',
    isSidebarCollapsed ? 'justify-center' : 'justify-start',
    isActive
      ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_12px_rgba(60,148,212,0.15)] rounded-xl'
      : 'text-muted-foreground hover:bg-primary/5 hover:text-primary border border-transparent rounded-xl'
  )

  const handleLogoutClick = () => {
    setIsLogoutOpen(true)
  }

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false)
    onLogout()
  }

  const handleProfileClick = () => {
    onPageChange('profile')
  }

  // Get user avatar url with Google fallback
  const userAvatar = user?.avatar_url || user?.picture || 'https://lh3.googleusercontent.com/a/default-user'

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen overflow-hidden border-r border-primary/15 bg-sidebar/85 backdrop-blur-md transition-[width] duration-300 ease-out-expo shadow-xl',
          isSidebarCollapsed ? 'w-[76px]' : 'w-[260px]'
        )}
      >
        <div className="flex flex-col h-full px-2 py-6">
          {/* Logo */}
          <div className="w-full px-2">
            <div className={cn('flex items-center gap-3', isSidebarCollapsed && 'justify-center')}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-md shadow-primary/20">
                K
              </div>
              {!isSidebarCollapsed && (
                <h1 className="text-xl font-bold tracking-tight text-foreground font-headline">
                  K-Dict
                </h1>
              )}
            </div>
          </div>
          {!isSidebarCollapsed && (
            <p className="ml-12 mt-1 text-[11px] text-muted-foreground font-sans">
              Học từ vựng lập trình
            </p>
          )}

          {/* Section Divider */}
          <div className="h-px bg-primary/10 my-4 mx-2" />

          {/* Navigation Items */}
          <nav className="flex w-full flex-col gap-1.5">
            <button
              type="button"
              onClick={() => onPageChange('analyze')}
              className={getSidebarButtonClass(currentPage === 'analyze')}
              title="Phân tích & Dịch"
            >
              <Wand2 className="h-4 w-4 shrink-0 text-primary" />
              {!isSidebarCollapsed && <span>Phân tích & Dịch</span>}
            </button>

            <button
              type="button"
              onClick={() => onPageChange('dictionary')}
              className={getSidebarButtonClass(currentPage === 'dictionary')}
              title="Sổ từ vựng của tôi"
            >
              <BookOpen className="h-4 w-4 shrink-0 text-primary" />
              {!isSidebarCollapsed && <span>Sổ từ vựng của tôi</span>}
            </button>

            <button
              type="button"
              onClick={() => onPageChange('exercises')}
              className={getSidebarButtonClass(currentPage === 'exercises')}
              title="Luyện tập & Bài tập"
            >
              <Dumbbell className="h-4 w-4 shrink-0 text-primary" />
              {!isSidebarCollapsed && <span>Bài tập</span>}
            </button>
          </nav>

          {/* Spacer & Bottom Actions Divider */}
          <div className="mt-auto flex w-full flex-col gap-2">
            {/* Section Divider */}
            <div className="h-px bg-primary/10 my-2 mx-2" />

            {/* Login / Profile Button */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                {isSidebarCollapsed ? (
                  <button
                    type="button"
                    onClick={handleProfileClick}
                    className={cn(
                      'mx-auto h-8 w-8 rounded-full border border-primary/20 overflow-hidden hover:border-primary transition-all duration-200 focus:outline-none',
                      currentPage === 'profile' && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    )}
                    title="Trang cá nhân"
                  >
                    <img
                      src={userAvatar}
                      alt={user?.name || user?.email}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ) : (
                  <div
                    onClick={handleProfileClick}
                    className={cn(
                      'rounded-xl border bg-background/40 p-3 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all duration-200',
                      currentPage === 'profile' ? 'border-primary shadow-[0_0_12px_rgba(60,148,212,0.15)]' : 'border-primary/15'
                    )}
                    title="Trang cá nhân"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={userAvatar}
                        alt={user?.name || user?.email}
                        className="h-8 w-8 rounded-full border border-primary/20 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">
                          {user?.name || 'K-Dict User'}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-300 ease-out-expo text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl font-medium text-sm border border-transparent',
                    isSidebarCollapsed ? 'justify-center' : 'justify-start'
                  )}
                  title="Đăng xuất"
                >
                  <LogIn className="h-4 w-4 shrink-0 rotate-180" />
                  {!isSidebarCollapsed && <span>Đăng xuất</span>}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-300 ease-out-expo bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl shadow-md font-medium text-sm border border-transparent',
                  isSidebarCollapsed ? 'justify-center' : 'justify-start'
                )}
                title="Đăng nhập"
              >
                <LogIn className="h-4 w-4 shrink-0" />
                {!isSidebarCollapsed && <span>Đăng nhập</span>}
              </button>
            )}

            {/* Collapse Button */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-300 ease-out-expo text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-xl font-medium text-sm border border-transparent',
                isSidebarCollapsed ? 'justify-center' : 'justify-start'
              )}
              title={isSidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <>
                  <PanelLeftClose className="h-4 w-4 shrink-0 text-primary" />
                  <span>Thu gọn</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  )
}

export default Sidebar

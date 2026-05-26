import { BookOpen, ChevronRight, LogIn, PanelLeftClose, Wand2 } from './icons'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

const NAV_ITEMS = [
  { key: 'analyze', label: 'Phân tích & Dịch', icon: Wand2 },
  { key: 'dictionary', label: 'Sổ từ vựng', icon: BookOpen },
]

function Sidebar({
  currentPage,
  onPageChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenAuth,
}) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen overflow-hidden border-r glass-surface',
        'transition-[width] duration-300 ease-out-expo',
        isSidebarCollapsed ? 'w-[72px]' : 'w-[280px]'
      )}
      style={{ borderColor: 'var(--glass-border)' }}
    >
      <div className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className={cn('flex items-center gap-3 px-5', isSidebarCollapsed && 'justify-center px-0')}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground shadow-sm">
            K
          </div>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-out-expo',
              isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            <h1 className="font-headline text-xl font-bold tracking-tight whitespace-nowrap">K-Dict</h1>
            <p className="text-[11px] text-muted-foreground whitespace-nowrap">Học từ vựng lập trình</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = currentPage === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => onPageChange(key)}
                title={label}
                aria-label={label}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                  'transition-all duration-200 ease-out-expo',
                  isActive
                    ? 'bg-primary/10 text-primary nav-active-bar'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  isSidebarCollapsed && 'justify-center px-0'
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span
                  className={cn(
                    'overflow-hidden whitespace-nowrap transition-all duration-300 ease-out-expo',
                    isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                  )}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom area */}
        <div className="mt-auto flex flex-col gap-2 px-3">
          {/* Login button */}
          <Button
            type="button"
            onClick={onOpenAuth}
            title="Đăng nhập"
            aria-label="Đăng nhập"
            className={cn(
              'gap-3 bg-primary text-primary-foreground shadow-sm bubble-up',
              'hover:bg-primary/90',
              isSidebarCollapsed ? 'h-10 w-10 p-0 justify-center' : 'w-full justify-start px-3'
            )}
          >
            <LogIn className="h-[18px] w-[18px] shrink-0" />
            <span
              className={cn(
                'overflow-hidden whitespace-nowrap transition-all duration-300 ease-out-expo',
                isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              )}
            >
              Đăng nhập
            </span>
          </Button>

          {/* Collapse toggle */}
          <button
            type="button"
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? 'Mở rộng' : 'Thu gọn'}
            aria-label={isSidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground',
              'transition-all duration-200 ease-out-expo hover:bg-accent hover:text-foreground',
              isSidebarCollapsed && 'justify-center px-0'
            )}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-[18px] w-[18px] shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="h-[18px] w-[18px] shrink-0" />
                <span className="overflow-hidden whitespace-nowrap">Thu gọn</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

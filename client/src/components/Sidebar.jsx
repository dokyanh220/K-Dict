import { BookOpen, ChevronRight, LogIn, PanelLeftClose, Wand2 } from './icons'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

function Sidebar({
  currentPage,
  onPageChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenAuth,
}) {
  const sidebarButtonClass = cn(
    'w-full gap-0 pl-2 pr-1 transition-all duration-500 ease-in-out border-b border-blue-600',
    isSidebarCollapsed ? 'justify-center' : 'justify-start'
  )

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen overflow-hidden border-r bg-card transition-[width] duration-500 ease-in-out',
        isSidebarCollapsed ? 'w-[76px]' : 'w-[260px]'
      )}
    >
      <div className={cn('flex flex-col h-full px-1 py-6', isSidebarCollapsed && 'items-center')}>
        {/* Logo */}
        <div className="w-full">
          <div className={cn('flex items-center gap-3', isSidebarCollapsed && 'justify-center')}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-base font-bold text-primary-foreground shadow-sm">
              K
            </div>
            {!isSidebarCollapsed && <h1 className="text-xl font-bold tracking-normal">K-Dict</h1>}
          </div>
        </div>
        {!isSidebarCollapsed && <p className="ml-12 mt-1 text-xs text-muted-foreground">Học từ vựng lập trình</p>}

        <nav className="mt-8 flex w-full flex-col gap-2">
          <Button
            type="button"
            variant={currentPage === 'analyze' ? 'secondary' : 'ghost'}
            size="default"
            onClick={() => onPageChange('analyze')}
            className={sidebarButtonClass}
            title="Phân tích & Dịch"
          >
            <Wand2 className="h-4 w-4" />
            {!isSidebarCollapsed && <span>Phân tích & Dịch</span>}
          </Button>

          <Button
            type="button"
            variant={currentPage === 'dictionary' ? 'secondary' : 'ghost'}
            size="default"
            onClick={() => onPageChange('dictionary')}
            className={sidebarButtonClass}
            title="Sổ từ vựng của tôi"
          >
            <BookOpen className="h-4 w-4" />
            {!isSidebarCollapsed && <span>Sổ từ vựng của tôi</span>}
          </Button>
        </nav>

        <div className="mt-auto flex w-full flex-col gap-2">
          <Button
            type="button"
            variant="default"
            size={isSidebarCollapsed ? 'icon' : 'default'}
            onClick={onOpenAuth}
            className={cn(!isSidebarCollapsed && 'justify-start')}
            title="Đăng nhập"
            style={{ backgroundColor: '#2563EB', color: '#fff' }}
          >
            <LogIn className="h-4 w-4" />
            {!isSidebarCollapsed && <span>Đăng nhập</span>}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size={isSidebarCollapsed ? 'icon' : 'default'}
            onClick={onToggleSidebar}
            className={cn('text-muted-foreground', !isSidebarCollapsed && 'justify-start')}
            title={isSidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Thu gọn</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

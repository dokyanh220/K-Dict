import Header from '../components/Header'
import { BookOpen, ChevronRight, LogIn, PanelLeftClose, Wand2 } from '../components/icons'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'

function MainLayout({
  children,
  currentPage,
  onPageChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenAuth,
  onDictionarySearch
}) {
  return (
    <div className={cn('grid min-h-screen bg-background', isSidebarCollapsed ? 'lg:grid-cols-[84px_1fr]' : 'lg:grid-cols-[280px_1fr]')}>
      <aside className={cn('hidden border-r bg-card px-4 py-6 lg:flex lg:flex-col', isSidebarCollapsed && 'items-center px-3')}>
        <div className="w-full">
          <div className={cn('flex items-center gap-3', isSidebarCollapsed && 'justify-center')}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-base font-bold text-primary-foreground shadow-sm">
              K
            </div>
            {!isSidebarCollapsed && <h1 className="text-xl font-bold tracking-normal">K-Dict</h1>}
          </div>
          {!isSidebarCollapsed && <p className="ml-12 mt-1 text-xs text-muted-foreground">Học từ vựng lập trình</p>}
        </div>

        <nav className="mt-8 flex w-full flex-col gap-2">
          <Button
            type="button"
            variant={currentPage === 'analyze' ? 'secondary' : 'ghost'}
            size={isSidebarCollapsed ? 'icon' : 'default'}
            onClick={() => onPageChange('analyze')}
            className={cn(!isSidebarCollapsed && 'justify-start')}
            title="Phân tích & Dịch"
          >
            <Wand2 className="h-4 w-4" />
            {!isSidebarCollapsed && <span>Phân tích & Dịch</span>}
          </Button>

          <Button
            type="button"
            variant={currentPage === 'dictionary' ? 'secondary' : 'ghost'}
            size={isSidebarCollapsed ? 'icon' : 'default'}
            onClick={() => onPageChange('dictionary')}
            className={cn(!isSidebarCollapsed && 'justify-start')}
            title="Sổ từ vựng của tôi"
          >
            <BookOpen className="h-4 w-4" />
            {!isSidebarCollapsed && <span>Sổ từ vựng của tôi</span>}
          </Button>
        </nav>

        <div className="mt-auto flex w-full flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size={isSidebarCollapsed ? 'icon' : 'default'}
            onClick={onOpenAuth}
            className={cn(!isSidebarCollapsed && 'justify-start')}
            title="Đăng nhập"
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

        {!isSidebarCollapsed && (
          <div className="mt-4 text-xs text-muted-foreground">
            <div>K-Dict v2.0 MVP</div>
            <div>The Modern Lexicon</div>
          </div>
        )}
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col">
        <Header onDictionarySearch={onDictionarySearch} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout

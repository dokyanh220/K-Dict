import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { cn } from '../lib/utils'

function MainLayout({
  children,
  currentPage,
  onPageChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenAuth,
  onDictionarySearch,
  user,
  isAuthenticated,
  onLogout
}) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={onPageChange}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={onToggleSidebar}
        onOpenAuth={onOpenAuth}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      {/* Main content shifted by sidebar width */}
      <div
        className={cn(
          'flex flex-col min-h-screen transition-[margin-left] duration-300 ease-out-expo',
          isSidebarCollapsed ? 'ml-[76px]' : 'ml-[260px]'
        )}
      >
        <Header onDictionarySearch={onDictionarySearch} />
        <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout

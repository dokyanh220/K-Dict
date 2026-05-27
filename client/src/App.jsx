import { useEffect, useState } from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import MainLayout from './layouts/MainLayout'
import AnalyzePage from './pages/AnalyzePage'
import DictionaryPage from './pages/DictionaryPage'
import ExercisesPage from './pages/ExercisesPage'
import ProfilePage from './pages/ProfilePage'
import AuthModal from './components/AuthModal'
import { useAuth } from './hooks/useAuth'

function App() {
  const [currentPage, setCurrentPage] = useState('analyze')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [dictionarySearch, setDictionarySearch] = useState('')
  const { user, isAuthenticated, login, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && (currentPage === 'dictionary' || currentPage === 'profile' || currentPage === 'exercises')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage('analyze')
    }
  }, [isAuthenticated, currentPage])

  const requireAuth = () => {
    setIsAuthOpen(true)
  }

  const handleDictionarySearch = keyword => {
    if (!isAuthenticated) {
      requireAuth()
      return
    }

    setDictionarySearch(keyword)
    setCurrentPage('dictionary')
  }

  const handlePageChange = page => {
    if ((page === 'dictionary' || page === 'profile' || page === 'exercises') && !isAuthenticated) {
      requireAuth()
      return
    }

    setCurrentPage(page)

    if (page !== 'dictionary') {
      setDictionarySearch('')
    }
  }

  const handleLogout = () => {
    logout()
    setCurrentPage('analyze')
  }

  return (
    <ThemeProvider>
      <MainLayout
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onDictionarySearch={handleDictionarySearch}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      >
        {currentPage === 'analyze' && (
          <AnalyzePage
            isAuthenticated={isAuthenticated}
            onRequireAuth={requireAuth}
          />
        )}
        {currentPage === 'dictionary' && (
          <DictionaryPage
            searchQuery={dictionarySearch}
            isAuthenticated={isAuthenticated}
            onRequireAuth={requireAuth}
          />
        )}
        {currentPage === 'exercises' && (
          <ExercisesPage />
        )}
        {currentPage === 'profile' && (
          <ProfilePage
            user={user}
            onPageChange={handlePageChange}
          />
        )}
      </MainLayout>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={login}
      />
    </ThemeProvider>
  )
}

export default App
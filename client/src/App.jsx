import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import AnalyzePage from './pages/AnalyzePage'
import DictionaryPage from './pages/DictionaryPage'
import AuthModal from './components/AuthModal'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('analyze')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [dictionarySearch, setDictionarySearch] = useState('')

  const handleDictionarySearch = (keyword) => {
    setDictionarySearch(keyword)
    setCurrentPage('dictionary')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Clear search term when switching page manually via sidebar
    if (page !== 'dictionary') {
      setDictionarySearch('')
    }
  }

  return (
    <>
      <MainLayout
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onDictionarySearch={handleDictionarySearch}
      >
        {currentPage === 'analyze' ? (
          <AnalyzePage />
        ) : (
          <DictionaryPage searchQuery={dictionarySearch} />
        )}
      </MainLayout>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </>
  )
}

export default App

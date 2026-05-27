import { useEffect, useState } from 'react'

import { vocabApi } from '../api/vocabApi'
import { BookOpen } from '../components/icons'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import VocabList from '../components/VocabList'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

function DictionaryPage({ searchQuery, isAuthenticated, onRequireAuth }) {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState(searchQuery || '')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, total_pages: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery)

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen className="h-8 w-8" />
        </div>

        <div>
          <h2 className="font-headline text-2xl font-semibold">
            Đăng nhập để mở sổ từ vựng
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Sổ từ vựng là dữ liệu cá nhân, bạn cần đăng nhập Google để lưu và quản lý từ.
          </p>
        </div>

        <Button type="button" onClick={onRequireAuth} className="rounded-xl">
          Đăng nhập với Google
        </Button>
      </div>
    )
  }

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery)
    setSearch(searchQuery || '')
    setPage(1)
  }

  const fetchVocabList = async (currentSearch, currentType, currentPage) => {
    setIsLoading(true)
    setError('')

    try {
      const data = await vocabApi.getVocab({
        search: currentSearch,
        type: currentType,
        page: currentPage,
        limit: 12
      })
      setItems(data.items || [])
      setPagination(data.pagination || { page: 1, limit: 12, total: 0, total_pages: 0 })
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách từ vựng.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVocabList(search, type, page)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, type, page])

  const handleSearchChange = (newVal) => {
    setSearch(newVal)
    setPage(1)
  }

  const handleTypeChange = (newVal) => {
    setType(newVal)
    setPage(1)
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa từ vựng này khỏi sổ từ cá nhân?')) {
      return
    }

    try {
      await vocabApi.deleteVocab(id)
      setItems(prev => prev.filter(item => item.id !== id))
      fetchVocabList(search, type, page)
    } catch (err) {
      alert(`Không thể xóa từ vựng: ${err.message}`)
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Page header */}
      <div className="animate-fade-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-headline text-2xl font-semibold tracking-tight">
            Sổ từ vựng cá nhân
          </h2>
        </div>
        <p className="ml-[52px] max-w-3xl text-sm leading-6 text-muted-foreground">
          Quản lý các từ vựng, cụm từ và câu tiếng Anh đã lưu. Bạn có thể tìm kiếm nhanh và lọc theo phân loại.
        </p>
      </div>

      {/* Search & Filter */}
      <Card className="card-elevated animate-fade-slide-up" style={{ animationDelay: '80ms' }}>
        <CardContent className="flex flex-col gap-4 p-5 pt-5">
          <SearchBar value={search} onChange={handleSearchChange} />
          <TypeFilter selectedType={type} onTypeChange={handleTypeChange} />
        </CardContent>
      </Card>

      {/* Vocabulary list */}
      <div className="animate-fade-slide-up" style={{ animationDelay: '160ms' }}>
        <VocabList
          items={items}
          onDelete={handleDeleteItem}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <Card className="card-elevated animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
          <CardContent className="flex flex-col items-center justify-between gap-3 p-4 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="gap-1"
            >
              Trang trước
            </Button>
            <span className="text-sm font-label text-muted-foreground tracking-wide">
              Trang {page} / {pagination.total_pages} · {pagination.total} từ
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.min(prev + 1, pagination.total_pages))}
              disabled={page === pagination.total_pages}
              className="gap-1"
            >
              Trang sau
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DictionaryPage

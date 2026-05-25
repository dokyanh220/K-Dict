import { useEffect, useState } from 'react'

import { vocabApi } from '../api/vocabApi'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import VocabList from '../components/VocabList'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

function DictionaryPage({ searchQuery }) {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState(searchQuery || '')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, total_pages: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery)

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
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">Sổ từ vựng cá nhân</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Quản lý các từ vựng, cụm từ và câu tiếng Anh đã lưu. Bạn có thể tìm kiếm nhanh và lọc theo phân loại.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:p-5">
          <SearchBar value={search} onChange={handleSearchChange} />
          <TypeFilter selectedType={type} onTypeChange={handleTypeChange} />
        </CardContent>
      </Card>

      <VocabList
        items={items}
        onDelete={handleDeleteItem}
        isLoading={isLoading}
        error={error}
      />

      {pagination.total_pages > 1 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-between gap-3 p-4 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Trang trước
            </Button>
            <span className="text-sm text-muted-foreground">
              Trang {page} / {pagination.total_pages} · Tổng số {pagination.total} từ
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPage(prev => Math.min(prev + 1, pagination.total_pages))}
              disabled={page === pagination.total_pages}
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

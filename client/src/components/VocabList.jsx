import VocabCard from './VocabCard'
import { AlertCircle, BookOpen, Loader2 } from './icons'
import { Card, CardContent } from './ui/card'

function VocabList({ items = [], onDelete, isLoading, error }) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 p-12 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p>Đang tải danh sách từ vựng...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="flex items-center gap-3 p-6 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p>Có lỗi xảy ra: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold tracking-normal">Chưa có từ vựng nào</h3>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Sử dụng tính năng phân tích văn bản để lưu trữ từ vựng mới của bạn.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <VocabCard
          key={item.id}
          item={item}
          actionType="delete"
          onAction={() => onDelete(item.id)}
        />
      ))}
    </div>
  )
}

export default VocabList

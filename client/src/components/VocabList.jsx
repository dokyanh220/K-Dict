import VocabCard from './VocabCard'
import { AlertCircle, BookOpen, Loader2 } from './icons'
import { Card, CardContent } from './ui/card'

function VocabList({ items = [], onDelete, isLoading, error }) {
  if (isLoading) {
    return (
      <Card className="card-elevated">
        <CardContent className="flex flex-col items-center justify-center gap-3 p-12 text-muted-foreground">
          <div className="animate-pulse-glow rounded-full p-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
          <p className="text-sm">Đang tải danh sách từ vựng...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="card-elevated border-destructive/30 bg-destructive/5">
        <CardContent className="flex items-center gap-3 p-6 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>Có lỗi xảy ra: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Card className="card-elevated">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Chưa có từ vựng nào</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Sử dụng tính năng phân tích văn bản để lưu trữ từ vựng mới của bạn.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="animate-fade-slide-up"
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <VocabCard
            item={item}
            actionType="delete"
            onAction={() => onDelete(item.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default VocabList

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Check, Loader2, Save, Trash2 } from './icons'
import { cn } from '../lib/utils'

function VocabCard({ item, actionType = 'save', onAction, isSaved = false, isSaving = false }) {
  const { text, type, meaning_vi, explanation_vi, example_en, example_vi } = item

  const typeClass = {
    word: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    phrase: 'border-sky-200 bg-sky-50 text-sky-700',
    sentence: 'border-amber-200 bg-amber-50 text-amber-700',
  }[type] || ''

  const handleBtnClick = (e) => {
    e.stopPropagation()
    if (actionType === 'save' && isSaved) return
    onAction?.(item)
  }

  return (
    <Card className="transition-shadow hover:shadow-soft">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-lg font-semibold leading-snug tracking-normal">{text}</h3>
            <Badge variant="outline" className={cn('uppercase', typeClass)}>
              {type}
            </Badge>
          </div>
          <p className="text-base font-medium text-primary">{meaning_vi}</p>
        </div>

        {actionType === 'save' ? (
          <Button
            type="button"
            size="sm"
            variant={isSaved ? 'secondary' : 'outline'}
            onClick={handleBtnClick}
            disabled={isSaved || isSaving}
            className="shrink-0"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang lưu
              </>
            ) : isSaved ? (
              <>
                <Check className="h-4 w-4" />
                Đã lưu
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Lưu từ
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleBtnClick}
            title="Xóa từ vựng"
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {explanation_vi && (
          <p className="text-sm leading-6 text-muted-foreground">{explanation_vi}</p>
        )}

        {example_en && (
          <div className="rounded-md border bg-muted/40 px-3 py-2">
            <p className="text-sm italic leading-6">{example_en}</p>
            {example_vi && <p className="mt-1 text-sm leading-6 text-muted-foreground">{example_vi}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VocabCard

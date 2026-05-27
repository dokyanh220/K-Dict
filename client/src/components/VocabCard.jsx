import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Check, Loader2, Save, Trash2, Volume2 } from './icons'
import { cn } from '../lib/utils'

function VocabCard({ item, actionType = 'save', onAction, isSaved = false, isSaving = false }) {
  const { text, type, meaning_vi, explanation_vi, example_en, example_vi } = item

  const typeStyles = {
    word: 'badge-word',
    phrase: 'badge-phrase',
    sentence: 'badge-sentence',
  }

  const typeLabels = {
    word: 'Từ',
    phrase: 'Cụm từ',
    sentence: 'Câu',
  }

  const handleBtnClick = (e) => {
    e.stopPropagation()
    if (actionType === 'save' && isSaved) return
    onAction?.(item)
  }

  const handleSpeak = (e) => {
    e.stopPropagation()

    if (!text?.trim()) return

    if (!window.speechSynthesis) {
      alert('Trình duyệt không hỗ trợ phát âm')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.pitch = 1

    window.speechSynthesis.speak(utterance)
  }

  return (
    <Card className="bg-card/90 border border-primary/20 hover:border-primary/40 rounded-xl card-elevated bubble-up duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          {/* Left: Headword, translation, speak button */}
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-headline text-lg font-bold leading-tight break-words text-foreground">
                {text}
              </h3>
              <button
                type="button"
                onClick={handleSpeak}
                title="Nghe phát âm"
                aria-label="Nghe phát âm"
                className="h-6 w-6 shrink-0 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors flex items-center justify-center"
              >
                <Volume2 className="h-4 w-4 text-primary" />
              </button>
            </div>
            <p className="text-sm font-semibold text-primary/95">{meaning_vi}</p>
          </div>

          {/* Right: Badge & Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="outline"
              className={cn(
                'font-label text-[10px] uppercase tracking-wider border px-2 py-0.5 rounded',
                typeStyles[type] || ''
              )}
            >
              {typeLabels[type] || type}
            </Badge>

            {actionType === 'save' ? (
              <Button
                type="button"
                size="sm"
                variant={isSaved ? 'secondary' : 'outline'}
                onClick={handleBtnClick}
                disabled={isSaved || isSaving}
                className={cn(
                  'h-7 gap-1 rounded-lg px-2.5 text-[11px] font-medium transition-all duration-200 border',
                  isSaved
                    ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary'
                    : 'border-primary/20 text-muted-foreground hover:border-primary/45 hover:text-primary'
                )}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Đang lưu
                  </>
                ) : isSaved ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Đã lưu
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    Lưu từ
                  </>
                )}
              </Button>
            ) : (
              <button
                type="button"
                onClick={handleBtnClick}
                title="Xóa từ vựng"
                aria-label="Xóa từ vựng"
                className="h-7 w-7 shrink-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-200 flex items-center justify-center"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {explanation_vi && (
          <p className="text-sm leading-6 text-muted-foreground">{explanation_vi}</p>
        )}

        {example_en && (
          <div className="rounded-lg border border-primary/10 bg-background/40 px-4 py-3 shadow-inner">
            <p className="text-sm italic leading-6 text-foreground">{example_en}</p>
            {example_vi && <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{example_vi}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VocabCard

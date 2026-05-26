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
    <Card className="card-elevated bubble-up border" style={{ borderColor: 'var(--glass-border)' }}>
      <CardHeader className="pb-3">
        {/* <div className="flex flex-col gap-1.5 min-w-0"> */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className='flex gap-2'>
              <h3 className="font-headline text-lg font-semibold leading-snug break-words">
                {text}
              </h3>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleSpeak}
                title="Nghe phát âm"
                aria-label="Nghe phát âm"
                className="h-7 w-7 shrink-0 rounded-md text-muted-foreground hover:text-primary"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </Button>
  
              <Badge
                variant="outline"
                className={cn(
                  'font-label text-[11px] uppercase tracking-wider border',
                  typeStyles[type] || ''
                )}
              >
                {typeLabels[type] || type}
              </Badge>
            </div>

            {actionType === 'save' ? (
              <Button
                type="button"
                size="sm"
                variant={isSaved ? 'secondary' : 'outline'}
                onClick={handleBtnClick}
                disabled={isSaved || isSaving}
                className="ml-1 h-7 gap-1 rounded-md px-2 text-[11px]"
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
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleBtnClick}
                title="Xóa từ vựng"
                aria-label="Xóa từ vựng"
                className="ml-1 h-7 w-7 shrink-0 rounded-md text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          <p className="text-sm font-medium text-primary">{meaning_vi}</p>
        {/* </div> */}
      </CardHeader>

      <CardContent className="space-y-3">
        {explanation_vi && (
          <p className="text-sm leading-6 text-muted-foreground">{explanation_vi}</p>
        )}

        {example_en && (
          <div className="rounded-lg border bg-muted/30 px-4 py-3" style={{ borderColor: 'var(--glass-border)' }}>
            <p className="text-sm italic leading-6">{example_en}</p>
            {example_vi && <p className="mt-1 text-sm leading-6 text-muted-foreground">{example_vi}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VocabCard

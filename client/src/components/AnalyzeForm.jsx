import { useState } from 'react'

import { Loader2, Wand2 } from './icons'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'

function AnalyzeForm({ onAnalyze, isLoading }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()

    if (!trimmed) {
      setError('Vui lòng nhập văn bản tiếng Anh cần phân tích.')
      return
    }

    setError('')
    onAnalyze(trimmed)
  }

  return (
    <Card className="bg-card/90 border border-primary/20 rounded-xl card-elevated shadow-lg relative overflow-hidden">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline text-xl font-bold text-foreground">Nhập nội dung tiếng Anh</CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Nhập từ, cụm từ hoặc câu để dịch và trích xuất từ vựng.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Textarea
              id="analyze-textarea"
              className="min-h-36 resize-none bg-background/40 rounded-xl border border-primary/20 hover:border-primary/40 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-300 shadow-inner focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-glow"
              placeholder="Ví dụ: I want to improve my coding skills..."
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                if (error) setError('')
              }}
              disabled={isLoading}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bubble-up gap-2 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl px-4 py-2 text-sm font-medium shadow-md transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Phân tích văn bản
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}

export default AnalyzeForm

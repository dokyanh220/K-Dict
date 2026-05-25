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
    <Card className="shadow-soft">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-lg">Nhập nội dung tiếng Anh</CardTitle>
          <CardDescription>
            Nhập từ, cụm từ hoặc câu để dịch và trích xuất từ vựng.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Textarea
              id="analyze-textarea"
              className="min-h-36 resize-none"
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
            <Button type="submit" disabled={isLoading}>
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

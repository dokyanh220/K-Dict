import { useEffect, useState } from 'react'
import { vocabApi } from '../api/vocabApi'
import { AlertCircle, Wand2 } from '../components/icons'
import AnalyzeForm from '../components/AnalyzeForm'
import AnalyzeResult from '../components/AnalyzeResult'
import { Card, CardContent } from '../components/ui/card'

function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [savedKeys, setSavedKeys] = useState(new Set())
  const [savingKeys, setSavingKeys] = useState(new Set())
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    let active = true
    const fetchExistingVocab = async () => {
      try {
        const res = await vocabApi.getVocab({ page: 1, limit: 100 })
        if (active && res?.items) {
          const keys = new Set(res.items.map(item => `${item.text.toLowerCase()}_${item.type}`))
          setSavedKeys(keys)
        }
      } catch (err) {
        console.error('Không thể tải danh sách từ vựng hiện có:', err)
      }
    }

    fetchExistingVocab()
    return () => { active = false }
  }, [])

  const handleAnalyzeText = async (text) => {
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await vocabApi.analyzeText(text, ['programmer'])
      setResult(data)
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra trong quá trình phân tích văn bản.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveItem = async (item) => {
    const uniqueKey = `${item.text.toLowerCase()}_${item.type}`

    setSavingKeys(prev => new Set(prev).add(uniqueKey))
    setSaveError('')

    try {
      await vocabApi.saveVocab({
        text: item.text,
        type: item.type,
        meaning_vi: item.meaning_vi,
        explanation_vi: item.explanation_vi || '',
        example_en: item.example_en || '',
        example_vi: item.example_vi || '',
        source_text: result?.translated_vi ? `Trích từ: ${result.translated_vi}` : ''
      })

      setSavedKeys(prev => new Set(prev).add(uniqueKey))
    } catch (err) {
      if (err.message && (err.message.includes('409') || err.message.includes('đã tồn tại'))) {
        setSavedKeys(prev => new Set(prev).add(uniqueKey))
      } else {
        setSaveError(`Không thể lưu từ "${item.text}": ${err.message}`)
      }
    } finally {
      setSavingKeys(prev => {
        const next = new Set(prev)
        next.delete(uniqueKey)
        return next
      })
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Page header */}
      <div className="animate-fade-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-headline text-2xl font-semibold tracking-tight">
            Phân tích văn bản & Dịch nghĩa
          </h2>
        </div>
        <p className="ml-[52px] max-w-3xl text-sm leading-6 text-muted-foreground">
          Nhập nội dung tiếng Anh để nhận bản dịch tiếng Việt và tự động trích xuất từ vựng, cụm từ quan trọng để lưu vào sổ từ cá nhân.
        </p>
      </div>

      <div className="animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
        <AnalyzeForm onAnalyze={handleAnalyzeText} isLoading={isLoading} />
      </div>

      {(error || saveError) && (
        <Card className="card-elevated border-destructive/30 bg-destructive/5 animate-fade-slide-up">
          <CardContent className="flex gap-3 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error || saveError}</span>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
          <AnalyzeResult
            result={result}
            onSaveItem={handleSaveItem}
            savedItemKeys={savedKeys}
            savingKeys={savingKeys}
          />
        </div>
      )}
    </div>
  )
}

export default AnalyzePage

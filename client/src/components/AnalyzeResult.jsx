import VocabCard from './VocabCard'
import { Languages } from './icons'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

function AnalyzeResult({ result, onSaveItem, savedItemKeys = new Set(), savingKeys = new Set() }) {
  if (!result) return null

  const { translated_vi, items = [] } = result

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm uppercase tracking-normal text-primary">Kết quả dịch nghĩa</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-7 text-foreground">{translated_vi}</p>
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-normal text-muted-foreground">
            Từ vựng quan trọng chiết xuất
          </h3>
          <Badge variant="secondary">{items.length} item</Badge>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Không chiết xuất được từ vựng nào từ văn bản này.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {items.map((item, idx) => {
              const uniqueKey = `${item.text.toLowerCase()}_${item.type}`
              const isSaved = savedItemKeys.has(uniqueKey)
              const isSaving = savingKeys.has(uniqueKey)

              return (
                <VocabCard
                  key={`${uniqueKey}_${idx}`}
                  item={item}
                  actionType="save"
                  isSaved={isSaved}
                  isSaving={isSaving}
                  onAction={() => onSaveItem(item)}
                />
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default AnalyzeResult

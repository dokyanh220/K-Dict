import VocabCard from './VocabCard'
import { Languages } from './icons'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

function AnalyzeResult({ result, onSaveItem, savedItemKeys = new Set(), savingKeys = new Set() }) {
  if (!result) return null

  const { translated_vi, items = [] } = result

  return (
    <div className="flex flex-col gap-6">
      {/* Translation result card */}
      <Card className="card-elevated border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
              <Languages className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="font-label text-xs uppercase tracking-widest text-primary">
              Kết quả dịch nghĩa
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-7 text-foreground">{translated_vi}</p>
        </CardContent>
      </Card>

      {/* Vocabulary section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Từ vựng quan trọng chiết xuất
          </h3>
          <Badge variant="secondary" className="font-label text-[11px]">
            {items.length} item
          </Badge>
        </div>

        {items.length === 0 ? (
          <Card className="card-elevated">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Không chiết xuất được từ vựng nào từ văn bản này.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, idx) => {
              const uniqueKey = `${item.text.toLowerCase()}_${item.type}`
              const isSaved = savedItemKeys.has(uniqueKey)
              const isSaving = savingKeys.has(uniqueKey)

              return (
                <div
                  key={`${uniqueKey}_${idx}`}
                  className="animate-fade-slide-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <VocabCard
                    item={item}
                    actionType="save"
                    isSaved={isSaved}
                    isSaving={isSaving}
                    onAction={() => onSaveItem(item)}
                  />
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default AnalyzeResult

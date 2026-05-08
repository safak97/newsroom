'use client'
import { CATEGORY_LABELS, type FeedCategory, type ContentType } from '@/lib/feeds'

interface FiltersProps {
  activeCategory: FeedCategory | 'all'
  activeType: ContentType | 'all'
  activeSource: string
  sources: string[]
  onCategory: (c: FeedCategory | 'all') => void
  onType: (t: ContentType | 'all') => void
  onSource: (s: string) => void
  total: number
}

const categories: Array<{ key: FeedCategory | 'all'; label: string }> = [
  { key: 'all', label: 'All Sources' },
  { key: 'left', label: 'Left / Alternative' },
  { key: 'mainstream', label: 'Mainstream' },
  { key: 'official', label: 'Official / Gov' },
  { key: 'ngo', label: 'NGO & Research' },
  { key: 'german', label: 'German' },
  { key: 'turkish', label: 'Turkish' },
  { key: 'academic', label: 'Academic' },
]

const types: Array<{ key: ContentType | 'all'; label: string }> = [
  { key: 'all', label: 'All types' },
  { key: 'article', label: '📄 Articles' },
  { key: 'video', label: '▶ Videos' },
  { key: 'podcast', label: '🎙 Podcasts' },
]

export default function Filters({ activeCategory, activeType, activeSource, sources, onCategory, onType, onSource, total }: FiltersProps) {
  return (
    <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 pb-3 pt-4 px-4 md:px-8 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => onCategory(c.key)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === c.key
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => onType(t.key)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              activeType === t.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {t.label}
          </button>
        ))}

        {sources.length > 0 && (
          <select
            value={activeSource}
            onChange={(e) => onSource(e.target.value)}
            className="text-xs px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-gray-400 outline-none ml-auto"
          >
            <option value="">All publications</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}

        <span className="text-xs text-gray-400 ml-auto">{total} articles</span>
      </div>
    </div>
  )
}

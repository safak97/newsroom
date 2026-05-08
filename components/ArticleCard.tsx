'use client'
import { type Article } from '@/app/api/feeds/route'
import { CATEGORY_COLORS, CATEGORY_LABELS, TYPE_ICONS } from '@/lib/feeds'

function timeAgo(dateStr: string): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export default function ArticleCard({ article }: { article: Article }) {
  const isVideo = article.type === 'video' && article.videoId

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      {isVideo ? (
        <div className="relative aspect-video bg-black">
          <img
            src={`https://i.ytimg.com/vi/${article.videoId}/mqdefault.jpg`}
            alt={article.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">▶</div>
          </div>
        </div>
      ) : article.imageUrl ? (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : null}

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[article.category]}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="text-xs text-gray-500">{TYPE_ICONS[article.type]} {article.source}</span>
          {article.language && article.language !== 'en' && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">{article.language}</span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{timeAgo(article.date)}</span>
        </div>

        <h2 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
          {article.title}
        </h2>

        {article.summary && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{article.summary}</p>
        )}
      </div>
    </a>
  )
}

'use client'
import { useState } from 'react'
import { type Article } from '@/app/api/feeds/route'
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/feeds'

function timeAgo(dateStr: string): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function BlogCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false)
  const hasFullContent = !!(article.fullContent && article.fullContent.length > 200)

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {article.imageUrl && !expanded && (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <span className={`px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[article.category]}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="font-medium text-gray-700">{article.source}</span>
          <span className="ml-auto">{timeAgo(article.date)}</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 leading-snug">
          {article.title}
        </h2>

        {/* Content */}
        {expanded && hasFullContent ? (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: article.fullContent! }}
          />
        ) : (
          article.summary && (
            <p className="text-sm text-gray-600 leading-relaxed">{article.summary}</p>
          )
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          {hasFullContent && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {expanded ? '↑ Collapse' : '↓ Read full post'}
            </button>
          )}
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-600 ml-auto transition-colors"
          >
            Open original →
          </a>
        </div>
      </div>
    </article>
  )
}

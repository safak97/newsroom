'use client'
import { useEffect, useState, useMemo } from 'react'
import { type Article } from '@/app/api/feeds/route'
import { type FeedCategory, type ContentType, FEEDS } from '@/lib/feeds'
import ArticleCard from '@/components/ArticleCard'
import Filters from '@/components/Filters'

const CACHE_KEY = 'newsroom_articles'
const CACHE_TTL = 15 * 60 * 1000

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [category, setCategory] = useState<FeedCategory | 'all'>('all')
  const [type, setType] = useState<ContentType | 'all'>('all')
  const [source, setSource] = useState('')
  const [search, setSearch] = useState('')

  async function loadArticles(force = false) {
    if (!force) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, ts } = JSON.parse(cached)
          if (Date.now() - ts < CACHE_TTL) {
            setArticles(data)
            setLastUpdated(new Date(ts))
            setLoading(false)
            return
          }
        }
      } catch {}
    }
    setLoading(true)
    try {
      const res = await fetch('/api/feeds')
      const data: Article[] = await res.json()
      setArticles(data)
      const now = new Date()
      setLastUpdated(now)
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: now.getTime() }))
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => { loadArticles() }, [])

  const sources = useMemo(() => {
    const filtered = category === 'all' ? articles : articles.filter((a) => a.category === category)
    return [...new Set(filtered.map((a) => a.source))].sort()
  }, [articles, category])

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (category !== 'all' && a.category !== category) return false
      if (type !== 'all' && a.type !== type) return false
      if (source && a.source !== source) return false
      if (search) {
        const q = search.toLowerCase()
        return a.title.toLowerCase().includes(q) || a.source.toLowerCase().includes(q) || (a.summary ?? '').toLowerCase().includes(q)
      }
      return true
    })
  }, [articles, category, type, source, search])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">The Newsroom</h1>
          <p className="text-xs text-gray-400">
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Loading feeds...'}
          </p>
        </div>

        <input
          type="search"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] max-w-md text-sm border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-blue-400 bg-gray-50"
        />

        <button
          onClick={() => loadArticles(true)}
          disabled={loading}
          className="ml-auto text-sm px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Refreshing...' : '↻ Refresh'}
        </button>
      </header>

      <Filters
        activeCategory={category}
        activeType={type}
        activeSource={source}
        sources={sources}
        onCategory={(c) => { setCategory(c); setSource('') }}
        onType={setType}
        onSource={setSource}
        total={filtered.length}
      />

      <main className="px-4 md:px-8 py-6">
        {loading && articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Fetching {FEEDS.length} feeds — this takes about 10 seconds...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-sm">No articles match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

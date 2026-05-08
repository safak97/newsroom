import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { FEEDS, type FeedCategory, type ContentType } from '@/lib/feeds'

export interface Article {
  id: string
  title: string
  link: string
  source: string
  category: FeedCategory
  type: ContentType
  date: string
  summary?: string
  imageUrl?: string
  videoId?: string
  language?: string
}

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['media:content', 'mediaContent', { keepArray: false }],
      ['yt:videoId', 'videoId'],
    ],
  },
})

function extractImage(item: any): string | undefined {
  if (item.mediaThumbnail?.$.url) return item.mediaThumbnail.$.url
  if (item.mediaContent?.$.url && item.mediaContent.$.medium === 'image') return item.mediaContent.$.url
  const match = item.content?.match(/<img[^>]+src="([^"]+)"/)
  return match?.[1]
}

function stripHtml(html: string): string {
  return html?.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim().slice(0, 220) ?? ''
}

async function fetchFeed(source: (typeof FEEDS)[0]): Promise<Article[]> {
  try {
    const feed = await Promise.race([
      parser.parseURL(source.url),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000)),
    ])
    return (feed.items ?? []).slice(0, 15).map((item: any) => ({
      id: item.guid ?? item.link ?? Math.random().toString(),
      title: item.title ?? 'Untitled',
      link: item.link ?? '',
      source: source.name,
      category: source.category,
      type: source.type,
      date: typeof (item.pubDate ?? item.isoDate) === 'string' ? (item.pubDate ?? item.isoDate) : '',
      summary: item.contentSnippet ? item.contentSnippet.slice(0, 220) : stripHtml(item.content ?? item.summary ?? ''),
      imageUrl: extractImage(item),
      videoId: item.videoId,
      language: source.language,
    }))
  } catch {
    return []
  }
}

export async function GET() {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed))
  const articles: Article[] = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .filter((a) => a.title && a.link)
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0
      const tb = b.date ? new Date(b.date).getTime() : 0
      return (isNaN(tb) ? 0 : tb) - (isNaN(ta) ? 0 : ta)
    })

  return NextResponse.json(articles, {
    headers: { 'Cache-Control': 's-maxage=900, stale-while-revalidate=1800' },
  })
}

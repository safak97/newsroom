import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { FEEDS, type FeedCategory, type ContentType } from '@/lib/feeds'
import { detectTopics, type Topic } from '@/lib/topics'

export interface Article {
  id: string
  title: string
  link: string
  source: string
  category: FeedCategory
  type: ContentType
  date: string
  summary?: string
  fullContent?: string
  imageUrl?: string
  videoId?: string
  language?: string
  topics: Topic[]
}

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['media:content', 'mediaContent', { keepArray: false }],
      ['yt:videoId', 'videoId'],
      ['content:encoded', 'content:encoded'],
    ],
  },
})

function extractImage(item: any): string | undefined {
  if (item.mediaThumbnail?.$.url) return item.mediaThumbnail.$.url
  if (item.mediaContent?.$.url && item.mediaContent.$.medium === 'image') return item.mediaContent.$.url
  const match = item.content?.match(/<img[^>]+src="([^"]+)"/)
  return match?.[1]
}

function stripHtml(html: string, limit = 220): string {
  return html?.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim().slice(0, limit) ?? ''
}

function cleanHtml(html: string): string {
  if (!html) return ''
  return html
    // remove scripts, styles, iframes
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    // remove subscribe / paywall / share divs
    .replace(/<div[^>]*class="[^"]*(?:subscribe|paywall|share|footer|cta|button)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // remove tracking pixels and tiny images
    .replace(/<img[^>]+width=["']?1["']?[^>]*>/gi, '')
    // clean inline styles and classes from remaining tags
    .replace(/\s*style="[^"]*"/gi, '')
    .replace(/\s*class="[^"]*"/gi, '')
    // open links in new tab
    .replace(/<a /gi, '<a target="_blank" rel="noopener noreferrer" ')
    .trim()
}

async function fetchFeed(source: (typeof FEEDS)[0]): Promise<Article[]> {
  try {
    const feed = await Promise.race([
      parser.parseURL(source.url),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000)),
    ])
    const isBlog = source.category === 'blog'
    return (feed.items ?? []).slice(0, isBlog ? 10 : 15).map((item: any) => {
      const rawContent = item.content ?? item['content:encoded'] ?? ''
      const rawSummary = item.contentSnippet ?? item.summary ?? ''
      return {
        id: item.guid ?? item.link ?? Math.random().toString(),
        title: item.title ?? 'Untitled',
        link: item.link ?? '',
        source: source.name,
        category: source.category,
        type: source.type,
        date: typeof (item.pubDate ?? item.isoDate) === 'string' ? (item.pubDate ?? item.isoDate) : '',
        summary: rawSummary ? stripHtml(rawSummary, 300) : stripHtml(rawContent, 300),
        fullContent: isBlog ? cleanHtml(rawContent) || undefined : undefined,
        imageUrl: extractImage(item),
        videoId: item.videoId,
        language: source.language,
        topics: detectTopics(item.title ?? '', rawSummary || rawContent),
      }
    })
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

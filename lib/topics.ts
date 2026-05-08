export type Topic =
  | 'economy'
  | 'politics'
  | 'international-relations'
  | 'gender'
  | 'political-economy'
  | 'pop-culture'
  | 'migration'
  | 'environment'
  | 'labour'
  | 'war-conflict'

export interface TopicDef {
  label: string
  emoji: string
  keywords: string[]
}

export const TOPICS: Record<Topic, TopicDef> = {
  'economy': {
    label: 'Economy',
    emoji: '📈',
    keywords: ['econom', 'gdp', 'inflation', 'recession', 'financial', 'market', 'trade', 'fiscal', 'monetary', 'budget', 'debt', 'growth', 'banking', 'fintech', 'tariff', 'interest rate', 'central bank', 'imf', 'world bank', 'bütçe', 'ekonomi', 'enflasyon', 'wirtschaft', 'konjunktur'],
  },
  'politics': {
    label: 'Politics',
    emoji: '🏛',
    keywords: ['politic', 'election', 'government', 'parliament', 'congress', 'senate', 'democracy', 'vote', 'party', 'minister', 'president', 'coalition', 'campaign', 'legislature', 'seçim', 'hükümet', 'meclis', 'siyaset', 'politik', 'wahlen', 'bundestag'],
  },
  'international-relations': {
    label: 'International Relations',
    emoji: '🌐',
    keywords: ['international', 'foreign', 'diplomac', 'treaty', 'nato', 'geopolit', 'sanction', 'bilateral', 'multilateral', 'alliance', 'sovereignty', 'un security', 'g7', 'g20', 'dışişleri', 'uluslararası', 'außenpolitik'],
  },
  'gender': {
    label: 'Gender',
    emoji: '⚧',
    keywords: ['gender', 'women', 'feminist', 'lgbtq', 'lgbt', 'sexuality', 'patriarch', 'reproductive', 'abortion', 'trans ', 'queer', 'sexism', 'misogyn', 'kadın', 'feminizm', 'toplumsal cinsiyet', 'geschlecht'],
  },
  'political-economy': {
    label: 'Political Economy',
    emoji: '⚖️',
    keywords: ['capitalism', 'neoliberal', 'labour', 'labor', 'working class', 'inequality', 'welfare', 'redistribution', 'wages', 'marxis', 'socialist', 'class struggle', 'exploitation', 'imperialism', 'accumulation', 'sınıf', 'kapitalizm', 'emek', 'kapitalismus', 'klassenkampf'],
  },
  'pop-culture': {
    label: 'Pop Culture',
    emoji: '🎬',
    keywords: ['film', 'music', 'cinema', 'television', 'tv show', 'sport', 'entertainment', 'celebrity', 'album', 'concert', 'festival', 'novel', 'artist', 'pop culture', 'hip hop', 'müzik', 'sinema', 'kültür', 'kultur', 'musik'],
  },
  'migration': {
    label: 'Migration',
    emoji: '🧳',
    keywords: ['migrat', 'refugee', 'asylum', 'immigrat', 'border', 'displacement', 'stateless', 'deportat', 'detention', 'göç', 'mülteci', 'sığınmacı', 'migration', 'flüchtling', 'asyl'],
  },
  'environment': {
    label: 'Environment',
    emoji: '🌱',
    keywords: ['climate', 'environment', 'ecological', 'carbon', 'emission', 'fossil fuel', 'renewable', 'deforestation', 'biodiversity', 'green', 'sustainability', 'iklim', 'çevre', 'umwelt', 'klimawandel'],
  },
  'labour': {
    label: 'Labour',
    emoji: '✊',
    keywords: ['union', 'strike', 'worker', 'workplace', 'employment', 'unemployment', 'minimum wage', 'gig economy', 'collective bargain', 'trade union', 'işçi', 'grev', 'sendika', 'gewerkschaft', 'streik'],
  },
  'war-conflict': {
    label: 'War & Conflict',
    emoji: '🕊',
    keywords: ['war', 'conflict', 'military', 'weapon', 'ceasefire', 'occupation', 'invasion', 'bombing', 'airstrike', 'armed', 'troops', 'siege', 'gaza', 'ukraine', 'savaş', 'çatışma', 'krieg', 'militär'],
  },
}

export function detectTopics(title: string, summary: string): Topic[] {
  const text = (title + ' ' + summary).toLowerCase()
  return (Object.entries(TOPICS) as [Topic, TopicDef][])
    .filter(([, def]) => def.keywords.some((kw) => text.includes(kw)))
    .map(([key]) => key)
}

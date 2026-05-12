export type FeedCategory = 'left' | 'mainstream' | 'german' | 'turkish' | 'academic' | 'official' | 'ngo' | 'blog'
export type ContentType = 'article' | 'video' | 'podcast'

export interface FeedSource {
  name: string
  url: string
  category: FeedCategory
  type: ContentType
  language?: string
  description?: string
}

export const FEEDS: FeedSource[] = [
  // ── Left / Alternative (English) ──────────────────────────────────────
  { name: 'Monthly Review', url: 'https://monthlyreview.org/feed/', category: 'left', type: 'article' },
  { name: 'Phenomenal World', url: 'https://www.phenomenalworld.org/feed/', category: 'left', type: 'article' },
  { name: 'The Lever', url: 'https://www.levernews.com/feed/', category: 'left', type: 'article' },
  { name: 'Novara Media', url: 'https://novaramedia.com/feed/', category: 'left', type: 'article' },
  { name: 'Novara Media (YouTube)', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCGHAEDxrUMNlcVYIkJMfmEQ', category: 'left', type: 'video' },
  { name: 'ACFM Podcast', url: 'https://feeds.acast.com/public/shows/acfm', category: 'left', type: 'podcast' },
  { name: "People's Dispatch", url: 'https://peoplesdispatch.org/feed/', category: 'left', type: 'article' },
  { name: 'WSWS', url: 'https://www.wsws.org/en/rss.xml', category: 'left', type: 'article', description: 'Trotskyist' },
  { name: 'Morning Star', url: 'https://morningstaronline.co.uk/feed', category: 'left', type: 'article' },
  { name: 'Venezuela Analysis', url: 'https://venezuelanalysis.com/feed/', category: 'left', type: 'article' },
  { name: 'LeftEast', url: 'https://lefteast.org/feed/', category: 'left', type: 'article' },
  { name: 'CounterPunch', url: 'https://www.counterpunch.org/feed/', category: 'left', type: 'article' },
  { name: "People's World", url: 'https://www.peoplesworld.org/feed/', category: 'left', type: 'article' },
  { name: 'TeleSUR English', url: 'https://www.telesurenglish.net/rss/', category: 'left', type: 'article' },
  { name: 'Kawsachun News', url: 'https://kawsachunnews.com/feed/', category: 'left', type: 'article' },

  // ── Academic: Marxist / Leftist ───────────────────────────────────────
  { name: 'Historical Materialism', url: 'https://www.historicalmaterialism.org/feed', category: 'academic', type: 'article' },
  { name: 'New Left Review', url: 'https://newleftreview.org/feed', category: 'academic', type: 'article' },
  { name: 'Catalyst Journal', url: 'https://catalyst-journal.com/feed', category: 'academic', type: 'article' },
  { name: 'Jacobin', url: 'https://jacobin.com/feed', category: 'academic', type: 'article' },
  { name: 'n+1', url: 'https://www.nplusonemag.com/feed/', category: 'academic', type: 'article' },
  { name: 'International Socialism Journal', url: 'https://isj.org.uk/rss', category: 'academic', type: 'article' },
  { name: 'Boston Review', url: 'https://www.bostonreview.net/feed/', category: 'academic', type: 'article' },
  { name: 'Dissent Magazine', url: 'https://www.dissentmagazine.org/feed/', category: 'academic', type: 'article' },
  { name: 'Corpus Dergi', url: 'https://corpusdergi.com/feed/', category: 'academic', type: 'article', language: 'tr' },

  // ── Academic: Mainstream / Accessible ────────────────────────────────
  { name: 'JSTOR Daily', url: 'https://daily.jstor.org/feed', category: 'academic', type: 'article' },
  { name: 'The Conversation', url: 'https://theconversation.com/us/articles.atom', category: 'academic', type: 'article' },
  { name: 'Aeon', url: 'https://aeon.co/feed.rss', category: 'academic', type: 'article' },
  { name: 'The Philosopher', url: 'https://thephilosopher1923.substack.com/feed', category: 'academic', type: 'article' },
  { name: 'Public Books', url: 'https://www.publicbooks.org/feed/', category: 'academic', type: 'article' },
  { name: 'LA Review of Books', url: 'https://lareviewofbooks.org/feed/', category: 'academic', type: 'article' },

  // ── Mainstream (20 biggest) ───────────────────────────────────────────
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', category: 'mainstream', type: 'article' },
  { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', category: 'mainstream', type: 'article' },
  { name: 'AP News', url: 'https://rsshub.app/apnews/topics/ap-top-news', category: 'mainstream', type: 'article' },
  { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss', category: 'mainstream', type: 'article' },
  { name: 'New York Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'mainstream', type: 'article' },
  { name: 'Washington Post', url: 'https://feeds.washingtonpost.com/rss/world', category: 'mainstream', type: 'article' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', category: 'mainstream', type: 'article' },
  { name: 'France 24', url: 'https://www.france24.com/en/rss', category: 'mainstream', type: 'article' },
  { name: 'Deutsche Welle (EN)', url: 'https://rss.dw.com/xml/rss-en-all', category: 'mainstream', type: 'article' },
  { name: 'Der Spiegel (International)', url: 'https://www.spiegel.de/international/index.rss', category: 'mainstream', type: 'article' },
  { name: 'Financial Times', url: 'https://www.ft.com/rss/home', category: 'mainstream', type: 'article' },
  { name: 'The Economist', url: 'https://www.economist.com/latest/rss.xml', category: 'mainstream', type: 'article' },
  { name: 'Bloomberg', url: 'https://feeds.bloomberg.com/politics/news.rss', category: 'mainstream', type: 'article' },
  { name: 'CNN', url: 'http://rss.cnn.com/rss/edition_world.rss', category: 'mainstream', type: 'article' },
  { name: 'NBC News', url: 'https://feeds.nbcnews.com/nbcnews/public/news', category: 'mainstream', type: 'article' },
  { name: 'Fox News', url: 'https://moxie.foxnews.com/google-publisher/world.xml', category: 'mainstream', type: 'article' },
  { name: 'Politico', url: 'https://www.politico.com/rss/politicopicks.xml', category: 'mainstream', type: 'article' },
  { name: 'The Hill', url: 'https://thehill.com/feed/', category: 'mainstream', type: 'article' },
  { name: 'Axios', url: 'https://api.axios.com/feed/', category: 'mainstream', type: 'article' },
  { name: 'Le Monde (EN)', url: 'https://www.lemonde.fr/en/rss/une.xml', category: 'mainstream', type: 'article' },

  // ── German ────────────────────────────────────────────────────────────
  { name: 'taz', url: 'https://taz.de/!p4608;rss/', category: 'german', type: 'article', language: 'de' },
  { name: 'junge Welt', url: 'https://www.jungewelt.de/feeds/newsticker.rss', category: 'german', type: 'article', language: 'de' },
  { name: 'Jacobin DE', url: 'https://jacobin.de/feed/', category: 'german', type: 'article', language: 'de' },
  { name: 'Neues Deutschland', url: 'https://www.nd-aktuell.de/rss/nd.rss', category: 'german', type: 'article', language: 'de' },

  // ── Turkish ───────────────────────────────────────────────────────────
  { name: 'BirGün', url: 'https://www.birgun.net/rss', category: 'turkish', type: 'article', language: 'tr' },
  { name: 'Cumhuriyet', url: 'https://www.cumhuriyet.com.tr/rss/son_dakika.xml', category: 'turkish', type: 'article', language: 'tr' },
  { name: 'Gazete Duvar', url: 'https://www.gazeteduvar.com.tr/feed', category: 'turkish', type: 'article', language: 'tr' },
  { name: 'Oksijen', url: 'https://oksijen.com/feed', category: 'turkish', type: 'article', language: 'tr' },
  { name: 'Sol Haber', url: 'https://haber.sol.org.tr/rss.xml', category: 'turkish', type: 'article', language: 'tr' },
  { name: 'Evrensel', url: 'https://www.evrensel.net/rss/haber.xml', category: 'turkish', type: 'article', language: 'tr' },
  { name: 'Velvele', url: 'https://velvele.net/feed/', category: 'turkish', type: 'article', language: 'tr' },

  // ── Official: Germany ─────────────────────────────────────────────────
  { name: 'Bundesregierung', url: 'https://www.bundesregierung.de/breg-de/service/newsletter-und-abos/rss-feed/rss-feed-pressemitteilungen-418772', category: 'official', type: 'article', language: 'de' },
  { name: 'BAMF', url: 'https://www.bamf.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Presse.xml', category: 'official', type: 'article', language: 'de' },
  { name: 'BMI (Bundesinnenministerium)', url: 'https://www.bmi.bund.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Presse.xml', category: 'official', type: 'article', language: 'de' },
  { name: 'Bundestag', url: 'https://www.bundestag.de/xml/rss/bt_pi.xml', category: 'official', type: 'article', language: 'de' },
  { name: 'Destatis', url: 'https://www.destatis.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Presse.xml', category: 'official', type: 'article', language: 'de' },
  { name: 'DeZIM Institute', url: 'https://dezim-institut.de/feed/', category: 'official', type: 'article', language: 'de' },

  // ── Official: EU / International ──────────────────────────────────────
  { name: 'European Commission (Migration)', url: 'https://ec.europa.eu/commission/presscorner/api/rss?topic=migration', category: 'official', type: 'article' },
  { name: 'European Parliament', url: 'https://www.europarl.europa.eu/rss/doc/top-stories/en.xml', category: 'official', type: 'article' },
  { name: 'Eurostat', url: 'https://ec.europa.eu/eurostat/en/rss/news', category: 'official', type: 'article' },
  { name: 'UNHCR', url: 'https://www.unhcr.org/rss/news.xml', category: 'official', type: 'article' },
  { name: 'IOM', url: 'https://www.iom.int/rss/iom-news.xml', category: 'official', type: 'article' },
  { name: 'UN Women', url: 'https://www.unwomen.org/en/rss-feeds/news', category: 'official', type: 'article' },
  { name: 'OECD', url: 'https://www.oecd.org/newsroom/rss.xml', category: 'official', type: 'article' },

  // ── Official: USA ─────────────────────────────────────────────────────
  { name: 'White House', url: 'https://www.whitehouse.gov/feed/', category: 'official', type: 'article' },
  { name: 'DHS', url: 'https://www.dhs.gov/news/rss.xml', category: 'official', type: 'article' },
  { name: 'USCIS', url: 'https://www.uscis.gov/feeds/news', category: 'official', type: 'article' },
  { name: 'Bureau of Labor Statistics', url: 'https://www.bls.gov/feed/bls_latest.rss', category: 'official', type: 'article' },

  // ── Official: Turkey ─────────────────────────────────────────────────
  { name: 'Resmi Gazete', url: 'https://www.resmigazete.gov.tr/rss/main.xml', category: 'official', type: 'article', language: 'tr' },
  { name: 'Göç İdaresi Başkanlığı', url: 'https://www.goc.gov.tr/rss', category: 'official', type: 'article', language: 'tr' },
  { name: 'TÜİK', url: 'https://data.tuik.gov.tr/rss/rss.xml', category: 'official', type: 'article', language: 'tr' },
  { name: 'TBMM', url: 'https://www.tbmm.gov.tr/rss/haberler.xml', category: 'official', type: 'article', language: 'tr' },
  { name: 'Dışişleri Bakanlığı', url: 'https://www.mfa.gov.tr/rss.tr.mfa', category: 'official', type: 'article', language: 'tr' },
  { name: 'İçişleri Bakanlığı', url: 'https://www.icisleri.gov.tr/rss', category: 'official', type: 'article', language: 'tr' },
  { name: 'Cumhurbaşkanlığı', url: 'https://www.tccb.gov.tr/haberler/rss', category: 'official', type: 'article', language: 'tr' },

  // ── NGOs, Foundations & Research ──────────────────────────────────────
  { name: 'Mediendienst Integration', url: 'https://mediendienst-integration.de/feed/', category: 'ngo', type: 'article', language: 'de' },
  { name: 'İHD (İnsan Hakları Derneği)', url: 'https://www.ihd.org.tr/feed/', category: 'ngo', type: 'article', language: 'tr' },
  { name: 'Mazlum-Der', url: 'https://mazlumder.org/feed/', category: 'ngo', type: 'article', language: 'tr' },
  { name: 'Mülteci-Der', url: 'https://multeci-der.org/feed/', category: 'ngo', type: 'article', language: 'tr' },
  { name: 'Amnesty Türkiye', url: 'https://www.amnesty.org.tr/feed/', category: 'ngo', type: 'article', language: 'tr' },
  { name: 'Helsinki Yurttaşlar Derneği', url: 'https://www.hyd.org.tr/feed/', category: 'ngo', type: 'article', language: 'tr' },
  { name: 'ReliefWeb', url: 'https://reliefweb.int/updates/rss.xml', category: 'ngo', type: 'article' },
  { name: 'OpenDemocracy', url: 'https://www.opendemocracy.net/en/rss.xml', category: 'ngo', type: 'article' },
  { name: 'Brookings Institution', url: 'https://www.brookings.edu/feed/', category: 'ngo', type: 'article' },
  { name: 'Chatham House', url: 'https://www.chathamhouse.org/rss.xml', category: 'ngo', type: 'article' },
  { name: 'Heinrich Böll Stiftung', url: 'https://www.boell.de/en/rss.xml', category: 'ngo', type: 'article' },
  { name: 'Friedrich Ebert Stiftung', url: 'https://www.fes.de/en/rss', category: 'ngo', type: 'article', language: 'de' },
  { name: 'Rosa Luxemburg Stiftung', url: 'https://www.rosalux.de/en/rss.xml', category: 'ngo', type: 'article' },
  { name: 'Migration Policy Institute', url: 'https://www.migrationpolicy.org/rss.xml', category: 'ngo', type: 'article' },
  { name: 'ACLU', url: 'https://www.aclu.org/rss/aclunews', category: 'ngo', type: 'article' },
  { name: 'Human Rights Watch', url: 'https://www.hrw.org/rss.xml', category: 'ngo', type: 'article' },
  { name: 'Our World in Data', url: 'https://ourworldindata.org/atom.xml', category: 'ngo', type: 'article' },

  // ── Blogs & Newsletters ───────────────────────────────────────────────
  // Personal / analytical
  { name: 'Zvi Mowshowitz', url: 'https://thezvi.substack.com/feed', category: 'blog', type: 'article' },
  { name: 'Construction Physics', url: 'https://www.construction-physics.com/feed', category: 'blog', type: 'article' },

  // Marxist / left economist blogs
  { name: 'Michael Roberts Blog', url: 'https://thenextrecession.wordpress.com/feed/', category: 'blog', type: 'article' },
  { name: 'Branko Milanovic', url: 'https://globalinequality.blogspot.com/feeds/posts/default', category: 'blog', type: 'article' },
  { name: 'David Harvey', url: 'https://davidharvey.org/feed/', category: 'blog', type: 'article' },
  { name: 'Doug Henwood (LBO)', url: 'https://lbo-news.com/feed/', category: 'blog', type: 'article' },
  { name: 'Naked Capitalism', url: 'https://www.nakedcapitalism.com/feed', category: 'blog', type: 'article' },

  // Left magazines / journals (blog format)
  { name: 'Tribune Magazine', url: 'https://tribunemag.co.uk/feed', category: 'blog', type: 'article' },
  { name: 'Salvage', url: 'https://salvage.zone/feed/', category: 'blog', type: 'article' },
  { name: 'Tempest Magazine', url: 'https://tempestmag.org/feed/', category: 'blog', type: 'article' },
  { name: 'Current Affairs', url: 'https://www.currentaffairs.org/feed', category: 'blog', type: 'article' },
]

export const CATEGORY_LABELS: Record<FeedCategory, string> = {
  left: 'Left / Alternative',
  mainstream: 'Mainstream',
  german: 'German',
  turkish: 'Turkish',
  academic: 'Academic',
  official: 'Official / Gov',
  ngo: 'NGO & Research',
  blog: 'Blogs & Newsletters',
}

export const CATEGORY_COLORS: Record<FeedCategory, string> = {
  left: 'bg-red-100 text-red-800 border-red-200',
  mainstream: 'bg-blue-100 text-blue-800 border-blue-200',
  german: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  turkish: 'bg-orange-100 text-orange-800 border-orange-200',
  academic: 'bg-purple-100 text-purple-800 border-purple-200',
  official: 'bg-slate-100 text-slate-800 border-slate-200',
  ngo: 'bg-teal-100 text-teal-800 border-teal-200',
  blog: 'bg-green-100 text-green-800 border-green-200',
}

export const TYPE_ICONS: Record<ContentType, string> = {
  article: '📄',
  video: '▶',
  podcast: '🎙',
}

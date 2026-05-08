'use client'
import { TOPICS, type Topic } from '@/lib/topics'

interface SidebarProps {
  activeTopic: Topic | null
  counts: Partial<Record<Topic, number>>
  onTopic: (t: Topic | null) => void
}

export default function Sidebar({ activeTopic, counts, onTopic }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-[97px] bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Topics</p>
        </div>
        <nav className="py-2">
          <button
            onClick={() => onTopic(null)}
            className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
              activeTopic === null
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>All Topics</span>
          </button>

          {(Object.entries(TOPICS) as [Topic, (typeof TOPICS)[Topic]][]).map(([key, def]) => {
            const count = counts[key] ?? 0
            return (
              <button
                key={key}
                onClick={() => onTopic(key)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                  activeTopic === key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{def.emoji}</span>
                  <span>{def.label}</span>
                </span>
                {count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTopic === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

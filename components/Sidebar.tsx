'use client'
import { TOPICS, type Topic } from '@/lib/topics'

interface SidebarProps {
  activeTopic: Topic | null
  counts: Partial<Record<Topic, number>>
  priorities: Topic[]
  onTopic: (t: Topic | null) => void
  onTogglePriority: (t: Topic) => void
}

export default function Sidebar({ activeTopic, counts, priorities, onTopic, onTogglePriority }: SidebarProps) {
  const entries = Object.entries(TOPICS) as [Topic, (typeof TOPICS)[Topic]][]
  const sorted = [
    ...entries.filter(([k]) => priorities.includes(k)).sort((a, b) => priorities.indexOf(a[0]) - priorities.indexOf(b[0])),
    ...entries.filter(([k]) => !priorities.includes(k)),
  ]

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-[97px] bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Topics</p>
          {priorities.length > 0 && (
            <span className="text-xs text-blue-500 font-medium">{priorities.length} ranked</span>
          )}
        </div>
        <nav className="py-2">
          <button
            onClick={() => onTopic(null)}
            className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
              activeTopic === null ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>All Topics</span>
          </button>

          {priorities.length > 0 && (
            <div className="mx-3 my-1 border-t border-dashed border-blue-200" />
          )}

          {sorted.map(([key, def]) => {
            const count = counts[key] ?? 0
            const rank = priorities.indexOf(key)
            const isRanked = rank !== -1
            const isActive = activeTopic === key
            return (
              <div
                key={key}
                className={`flex items-center group transition-colors ${
                  isActive ? 'bg-gray-900' : isRanked ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => onTopic(key)}
                  className="flex-1 flex items-center justify-between px-4 py-2 text-sm min-w-0"
                >
                  <span className={`flex items-center gap-2 ${isActive ? 'text-white' : isRanked ? 'text-blue-900' : 'text-gray-700'}`}>
                    <span>{def.emoji}</span>
                    <span className="truncate">{def.label}</span>
                  </span>
                  {count > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1 shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : isRanked ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); onTogglePriority(key) }}
                  title={isRanked ? `Priority ${rank + 1} — click to remove` : 'Add to priority ranking'}
                  className={`pr-3 pl-1 py-2 shrink-0 transition-opacity ${
                    isRanked
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-60'
                  }`}
                >
                  {isRanked ? (
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                      {rank + 1}
                    </span>
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 text-xs">
                      +
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

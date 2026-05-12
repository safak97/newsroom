'use client'
import { TOPICS, type Topic } from '@/lib/topics'

interface TopicStripProps {
  activeTopic: Topic | null
  counts: Partial<Record<Topic, number>>
  priorities: Topic[]
  onTopic: (t: Topic | null) => void
  onTogglePriority: (t: Topic) => void
}

export default function TopicStrip({ activeTopic, counts, priorities, onTopic, onTogglePriority }: TopicStripProps) {
  const entries = Object.entries(TOPICS) as [Topic, (typeof TOPICS)[Topic]][]
  const sorted = [
    ...entries.filter(([k]) => priorities.includes(k)).sort((a, b) => priorities.indexOf(a[0]) - priorities.indexOf(b[0])),
    ...entries.filter(([k]) => !priorities.includes(k)),
  ]

  return (
    <div className="lg:hidden border-b border-gray-200 bg-white">
      <div className="flex overflow-x-auto gap-2 px-4 py-3 scrollbar-hide">
        <button
          onClick={() => onTopic(null)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            activeTopic === null
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
          }`}
        >
          All
        </button>

        {sorted.map(([key, def]) => {
          const rank = priorities.indexOf(key)
          const isRanked = rank !== -1
          const isActive = activeTopic === key

          return (
            <div key={key} className="shrink-0 flex items-center">
              <button
                onClick={() => onTopic(key)}
                className={`flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-l-full text-sm border-y border-l transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : isRanked
                    ? 'bg-blue-50 text-blue-900 border-blue-200'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                <span>{def.emoji}</span>
                <span>{def.label}</span>
              </button>
              <button
                onClick={() => onTogglePriority(key)}
                title={isRanked ? `Priority ${rank + 1} — tap to remove` : 'Add to priority'}
                className={`flex items-center justify-center w-7 h-full rounded-r-full border-y border-r text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white border-gray-900'
                    : isRanked
                    ? 'bg-blue-200 text-blue-800 border-blue-200'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {isRanked ? rank + 1 : '+'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

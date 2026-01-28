import Terminal from './Terminal'

export default function ThinkingPanel({ data }) {
  return (
    <div className="space-y-6">
      {/* AI Status */}
      <div className="flex items-center justify-between text-sm font-mono">
        <span className="text-terminal-green-dim">🤖 Agent Status: THINKING</span>
        <span className="text-terminal-green-dim">
          Last thought: {data.length > 0 ? new Date(data[0].timestamp).toLocaleTimeString() : 'N/A'}
        </span>
      </div>

      {/* Thinking Cards */}
      <div className="space-y-4">
        {data.map((item) => (
          <Terminal key={item.id} title={`thought_${item.id}`}>
            <div className="space-y-2">
              <div className="text-terminal-green-dim text-xs">
                [{new Date(item.timestamp).toISOString()}]
              </div>
              <div className="whitespace-pre-wrap text-terminal-green">
                {item.content}
              </div>
              {item.ascii && (
                <pre className="ascii-art mt-4 text-terminal-green-dim">{item.ascii}</pre>
              )}
            </div>
          </Terminal>
        ))}
      </div>

      {/* Thinking Progress */}
      <div className="border border-terminal-gray rounded-lg p-4">
        <div className="text-sm text-terminal-green-dim mb-2">Next thought in:</div>
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded ${
                i < 7 ? 'bg-terminal-green' : 'bg-terminal-gray'
              }`}
            ></div>
          ))}
        </div>
        <div className="text-xs text-terminal-green-dim mt-1 text-right">~15 minutes remaining</div>
      </div>
    </div>
  )
}

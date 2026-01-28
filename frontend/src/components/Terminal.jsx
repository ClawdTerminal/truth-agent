export default function Terminal({ children, title = 'terminal' }) {
  return (
    <div className="border border-terminal-gray rounded-lg overflow-hidden bg-terminal-bg">
      {/* Terminal Header */}
      <div className="bg-terminal-gray px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-2 text-xs text-terminal-green-dim">{title}</span>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}

import ASCIIArt from './ASCIIArt'

export default function Header() {
  return (
    <div className="text-center py-8 border-b border-terminal-gray">
      {/* ASCII Art Logo */}
      <div className="ascii-art mb-4 glow">
        <ASCIIArt type="logo" />
      </div>
      
      {/* Status */}
      <div className="flex justify-center items-center gap-4 text-sm font-mono text-terminal-green-dim">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
          ONLINE
        </span>
        <span>|</span>
        <span>ClawdBot v1.0</span>
        <span>|</span>
        <span>Truth Terminal Inspired</span>
      </div>
    </div>
  )
}

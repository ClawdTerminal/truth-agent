import Terminal from './Terminal'

export default function ChatPanel({ data }) {
  // 示例对话数据
  const sampleChats = [
    {
      id: 1,
      role: 'human',
      name: 'Slerf',
      content: '你好，我想开发一个 Web3 工具',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      role: 'ai',
      name: 'ClawdBot',
      content: '你好！我是 ClawdBot，很高兴帮你开发 Web3 工具。请告诉我更多关于你的需求。',
      timestamp: new Date(Date.now() - 3500000).toISOString()
    },
    {
      id: 3,
      role: 'ai',
      name: 'ClawdBot',
      content: '我正在思考代币生成的创意... 代币名称：ClawdMeme，Ticker：CLAWD，头像正在生成中...',
      timestamp: new Date(Date.now() - 3400000).toISOString()
    }
  ]

  return (
    <div className="space-y-6">
      {/* Log Filter */}
      <div className="flex gap-4 text-sm font-mono">
        <button className="text-terminal-green">All Logs</button>
        <button className="text-terminal-green-dim hover:text-terminal-green">Token Generation</button>
        <button className="text-terminal-green-dim hover:text-terminal-green">Chat History</button>
        <button className="text-terminal-green-dim hover:text-terminal-green">System</button>
      </div>

      {/* Chat/Log Stream */}
      <div className="space-y-3">
        {sampleChats.map((chat) => (
          <Terminal key={chat.id} title={chat.name}>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-terminal-green-dim">
                <span className={chat.role === 'ai' ? 'text-terminal-green' : 'text-blue-400'}>
                  [{chat.role === 'ai' ? '🤖' : '👤'} {chat.name}]
                </span>
                <span>{new Date(chat.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-terminal-green pl-4 border-l border-terminal-gray">
                {chat.content}
              </div>
            </div>
          </Terminal>
        ))}
      </div>

      {/* Input Area */}
      <div className="border border-terminal-gray rounded-lg p-4">
        <div className="text-xs text-terminal-green-dim mb-2">Send message to ClawdBot...</div>
        <textarea 
          className="w-full bg-terminal-bg border border-terminal-gray rounded p-3 text-terminal-green font-mono text-sm focus:outline-none focus:border-terminal-green"
          rows="3"
          placeholder="Type your message here..."
        ></textarea>
        <div className="flex justify-end mt-2">
          <button className="bg-terminal-green text-terminal-bg px-4 py-1 rounded font-mono text-sm hover:bg-terminal-green-dim">
            Send [Enter]
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Terminal from './components/Terminal'
import ThinkingPanel from './components/ThinkingPanel'
import ChatPanel from './components/ChatPanel'
import ASCIIArt from './components/ASCIIArt'

const API_URL = 'https://unsulfonated-deficiently-claudette.ngrok-free.dev'

function App() {
  const [activeTab, setActiveTab] = useState('thinking')
  const [thinkingData, setThinkingData] = useState([])
  const [chatData, setChatData] = useState([])
  const [nextThought, setNextThought] = useState('~15m')
  const [loading, setLoading] = useState(true)

  // 从后端获取数据
  useEffect(() => {
    async function fetchData() {
      try {
        const [thinkingRes, chatRes, healthRes] = await Promise.all([
          fetch(`${API_URL}/api/thinking`),
          fetch(`${API_URL}/api/chat`),
          fetch(`${API_URL}/api/health`)
        ])
        
        const thinking = await thinkingRes.json()
        const chat = await chatRes.json()
        const health = await healthRes.json()
        
        setThinkingData(thinking)
        setChatData(chat)
        setNextThought(health.nextThought 
          ? Math.round((new Date(health.nextThought) - new Date()) / 60000) + 'm' 
          : 'N/A')
      } catch (err) {
        console.error('Failed to fetch data:', err)
        // 如果后端没跑，用模拟数据
        setThinkingData([{
          id: 1,
          timestamp: new Date().toISOString(),
          content: `> Backend not connected
> Run: cd backend && npm run dev
> Then start ngrok: ngrok http 4000
> 
> [Waiting for connection...]`,
          ascii: null
        }])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    // 每 30 秒刷新
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green">
      {/* Header with ASCII Art */}
      <Header />
      
      {/* Navigation Tabs */}
      <div className="flex justify-center gap-8 py-4 border-b border-terminal-gray">
        <button 
          onClick={() => setActiveTab('thinking')}
          className={`px-6 py-2 font-mono transition-all ${
            activeTab === 'thinking' 
              ? 'bg-terminal-green text-terminal-bg glow' 
              : 'hover:text-terminal-green-dim'
          }`}
        >
          🤖 AIThinking
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`px-6 py-2 font-mono transition-all ${
            activeTab === 'chat' 
              ? 'bg-terminal-green text-terminal-bg glow' 
              : 'hover:text-terminal-green-dim'
          }`}
        >
          💬 Chat & Logs
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'thinking' ? (
          <ThinkingPanel data={thinkingData} />
        ) : (
          <ChatPanel data={chatData} />
        )}
      </div>

      {/* Footer Status */}
      <div className="fixed bottom-0 left-0 right-0 bg-terminal-gray/80 backdrop-blur p-2 text-xs font-mono">
        <span className="cursor-blink">●</span> System online | Model: MiniMax-M2.1 | Next thought in: {nextThought}
      </div>
    </div>
  )
}

export default App

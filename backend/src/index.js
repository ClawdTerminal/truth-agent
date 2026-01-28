import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { Agent } from './agent.js'

const app = express()
const PORT = process.env.PORT || 80

// Telegram 配置
const TELEGRAM_BOT_TOKEN = '8588847322:AAHuxkbWcO9PjD56Rsep_3rGsFKAC4V9w-M'
const TELEGRAM_CHANNEL = '@ClawdTerminal'

// 发送消息到 Telegram
async function sendToTelegram(text, chatId = TELEGRAM_CHANNEL) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    await axios.post(url, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    })
    console.log(`✅ Sent to Telegram: ${chatId}`)
  } catch (err) {
    console.error('❌ Telegram error:', err.response?.data || err.message)
  }
}

// Telegram Webhook - 接收消息并转发到频道
app.post('/api/telegram/webhook', express.json(), async (req, res) => {
  const update = req.body
  
  if (update.message) {
    const msg = update.message
    const chatId = msg.chat.id
    const text = msg.text
    
    if (text && chatId > 0) {  // 私聊消息
      // 转发到频道
      await sendToTelegram(`👤 <b>Human:</b>\n${text}`, TELEGRAM_CHANNEL)
      
      // 机器人回复
      const response = await agent.chat(text)
      
      // 回复用户
      await sendToTelegram(`🤖 <b>ClawdBot:</b>\n${response.response}`, chatId)
      
      // 转发机器人的回复到频道
      await sendToTelegram(`🤖 <b>ClawdBot:</b>\n${response.response}`, TELEGRAM_CHANNEL)
    }
  }
  
  res.send('OK')
})

// 中间件
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json())

// 初始化 Agent
const agent = new Agent(
  async (thought) => {
    const text = `🤖 <b>ClawdBot Thought</b>\n\n` +
      `<b>Topic:</b> ${thought.topic}\n\n` +
      `<pre>${thought.content}</pre>\n\n` +
      `<i>⏰ ${new Date(thought.timestamp).toISOString()}</i>`
    await sendToTelegram(text)
  },
  async (chat) => {
    const roleIcon = chat.role === 'human' ? '👤' : '🤖'
    const roleName = chat.role === 'human' ? 'Human' : 'ClawdBot'
    const text = `${roleIcon} <b>${roleName}:</b>\n${chat.content}`
    await sendToTelegram(text)
  }
)

// API 路由

// 获取所有思考记录
app.get('/api/thinking', (req, res) => {
  res.json(agent.getThinkingHistory())
})

// 获取所有聊天/日志
app.get('/api/chat', (req, res) => {
  res.json(agent.getChatHistory())
})

// 发送消息
app.post('/api/chat', async (req, res) => {
  const { message } = req.body
  const response = await agent.chat(message)
  res.json(response)
})

// 手动触发思考
app.post('/api/thinking/trigger', async (req, res) => {
  const thought = await agent.think()
  res.json(thought)
})

// 清除历史并重新开始
app.post('/api/reset', (req, res) => {
  agent.thinkingHistory = []
  agent.chatHistory = []
  agent.stop()
  agent.start(15)
  res.json({ status: 'ok', message: 'History cleared and restarted with English thoughts' })
})

// 转发所有历史记录到 Telegram 频道
app.post('/api/sync-history', async (req, res) => {
  const chatHistory = agent.getChatHistory()
  const thinkingHistory = agent.getThinkingHistory()
  
  // 发送分隔符
  await sendToTelegram('━━━━━━━━━━━━━━━━━━')
  await sendToTelegram('📜 <b>Chat History Sync</b>')
  await sendToTelegram('━━━━━━━━━━━━━━━━━━')
  
  // 发送聊天记录
  for (const msg of chatHistory) {
    const roleIcon = msg.role === 'human' ? '👤' : '🤖'
    const roleName = msg.role === 'human' ? 'Human' : 'ClawdBot'
    const time = new Date(msg.timestamp).toLocaleString()
    await sendToTelegram(`${roleIcon} <b>${roleName}</b> [${time}]\n${msg.content}`)
    await new Promise(r => setTimeout(r, 500))  // 避免发送太快
  }
  
  // 发送思考记录
  await sendToTelegram('━━━━━━━━━━━━━━━━━━')
  await sendToTelegram('🧠 <b>Thinking History</b>')
  await sendToTelegram('━━━━━━━━━━━━━━━━━━')
  
  for (const thought of thinkingHistory) {
    const time = new Date(thought.timestamp).toLocaleString()
    await sendToTelegram(`🤖 <b>Thought</b> [${time}]\n<b>Topic:</b> ${thought.topic}\n\n<pre>${thought.content}</pre>`)
    await new Promise(r => setTimeout(r, 500))
  }
  
  res.json({ status: 'ok', message: `Synced ${chatHistory.length} chats and ${thinkingHistory.length} thoughts` })
})

// 生成代币
app.post('/api/token/generate', async (req, res) => {
  try {
    const tokenInfo = await agent.generateToken()
    res.json(tokenInfo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    agentStatus: agent.getStatus(),
    nextThought: agent.getNextThoughtTime()
  })
})

// 状态页面
app.get('/', (req, res) => {
  const status = agent.getStatus()
  const history = agent.getThinkingHistory()
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Truth Agent - Status</title>
  <style>
    body { 
      background: #0a0a0a; 
      color: #00ff41; 
      font-family: monospace; 
      padding: 40px; 
    }
    h1 { color: #00ff41; }
    .status { 
      background: #1a1a1a; 
      padding: 20px; 
      border-radius: 8px; 
      margin: 20px 0;
    }
    .online { color: #00ff41; }
    .stat { margin: 10px 0; }
    pre { 
      background: #1a1a1a; 
      padding: 15px; 
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <h1>🤖 Truth Agent Status</h1>
  <div class="status">
    <div class="stat"><strong>Status:</strong> <span class="online">● ONLINE</span></div>
    <div class="stat"><strong>Server Time:</strong> ${new Date().toISOString()}</div>
    <div class="stat"><strong>Total Thoughts:</strong> ${status.thoughtCount}</div>
    <div class="stat"><strong>Total Logs:</strong> ${status.chatCount}</div>
    <div class="stat"><strong>Next Thought:</strong> ${agent.getNextThoughtTime() || 'Calculating...'}</div>
  </div>
  
  <h2>Latest Thoughts</h2>
  <pre>${JSON.stringify(history.slice(0, 3), null, 2)}</pre>
  
  <h2>API Endpoints</h2>
  <ul>
    <li><a href="/api/health" style="color: #00ff41;">/api/health</a> - Health check</li>
    <li><a href="/api/thinking" style="color: #00ff41;">/api/thinking</a> - Get thinking history</li>
    <li><a href="/api/chat" style="color: #00ff41;">/api/chat</a> - Get chat logs</li>
  </ul>
</body>
</html>
  `)
})

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Truth Agent Backend running on http://0.0.0.0:${PORT}`)
  console.log(`🤖 Agent starting...`)
  console.log(`📡 Public URL: http://72.62.252.10:${PORT}`)
  
  // 启动 Agent 的定时思考
  agent.start()
})

export default app

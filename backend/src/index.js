import express from 'express'
import cors from 'cors'
import { Agent } from './agent.js'

const app = express()
const PORT = process.env.PORT || 4000

// 中间件
app.use(cors())
app.use(express.json())

// 初始化 Agent
const agent = new Agent()

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

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Truth Agent Backend running on http://localhost:${PORT}`)
  console.log(`🤖 Agent starting...`)
  
  // 启动 Agent 的定时思考
  agent.start()
})

export default app

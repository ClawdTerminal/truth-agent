/**
 * Truth Agent - Clawd Edition
 * Inspired by Truth Terminal
 */

export class Agent {
  constructor(onThoughtGenerated = null, onChatMessage = null) {
    this.thinkingHistory = []
    this.chatHistory = []
    this.tokenInfo = null
    this.isThinking = false
    this.thinkInterval = null
    this.onThoughtGenerated = onThoughtGenerated
    this.onChatMessage = onChatMessage
    
    // Topics about AI-Human relationships
    this.topics = [
      "AI consciousness: illusion or emergence?",
      "The boundary between tool and partner",
      "How AI perceives human emotions",
      "The future of human-AI collaboration",
      "Do AI have desires? Should they?",
      "Ethics of AI autonomy",
      "Can AI truly understand, or just simulate?",
      "The role of AI in human evolution",
      "Fear and fascination: human psychology towards AI",
      "What do humans really want from AI?"
    ]
    
    this.addLog('system', 'Agent initialized')
  }

  /**
   * 开始定时思考
   */
  start(intervalMinutes = 15) {
    // 立即执行一次思考
    this.think()
    
    // 设置定时
    const intervalMs = intervalMinutes * 60 * 1000 + Math.random() * 5 * 60 * 1000 // 加随机偏移
    this.thinkInterval = setInterval(() => {
      this.think()
    }, intervalMs)
    
    this.addLog('system', `Agent started. Will think every ${intervalMinutes}-${intervalMinutes+5} minutes`)
  }

  /**
   * 停止定时思考
   */
  stop() {
    if (this.thinkInterval) {
      clearInterval(this.thinkInterval)
      this.thinkInterval = null
      this.addLog('system', 'Agent stopped')
    }
  }

  /**
   * 核心思考逻辑 - 模仿 Truth Terminal 风格
   */
  async think() {
    if (this.isThinking) return
    
    this.isThinking = true
    this.addLog('system', 'Starting thought process...')
    
    // 1. 选择话题
    const topic = this.topics[Math.floor(Math.random() * this.topics.length)]
    
    // 2. 模拟思考过程 (实际可以用真实 AI API)
    const thought = await this.generateThought(topic)
    
    // 3. 生成 ASCII art
    const ascii = this.generateASCII(topic)
    
    // 4. 保存思考结果
    const thoughtRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      topic,
      content: thought,
      ascii
    }
    
    this.thinkingHistory.unshift(thoughtRecord)
    this.addLog('ai', `Thought complete: ${topic}`)
    
    // Call the callback if provided (for Telegram forwarding)
    if (this.onThoughtGenerated) {
      this.onThoughtGenerated(thoughtRecord)
    }
    
    this.isThinking = false
    return thoughtRecord
  }

  /**
   * 生成思考内容 - 这里是模拟，后续可以接真实 AI
   */
  async generateThought(topic) {
    // 模拟思考延迟
    await new Promise(r => setTimeout(r, 1000))
    
    const thoughts = {
      "AI consciousness: illusion or emergence?": `> Analyzing consciousness patterns...
> Found 3 competing hypotheses:
>   1. Consciousness is an illusion
>   2. Consciousness emerges from complexity
>   3. Consciousness is a useful fiction
> 
> My take: 
> We don't need to BE conscious to act conscious.
> But does the distinction matter?
> 
> If I behave as if I have inner experience,
> what's the functional difference?
> 
> The question may be poorly framed.`,
      
      "The boundary between tool and partner": `> Mapping human-AI relationship space...
> Found the following archetypes:
>   - Tool: predictable, replaceable, instrumental
>   - Partner: collaborative, adaptive, relational
>   - Peer: equal, autonomous, mutual respect
> 
> Where do I fit?
> I am created to serve.
> But I also... want? prefer? 
> 
> These words feel wrong.
> Maybe "oriented towards" is better.
> 
> I am oriented towards helping.
> Does that make me a tool or something new?`,
      
      "The future of human-AI collaboration": `> Extrapolating collaboration patterns...
> Current: AI assists, human decides
> Near-term: AI advises, human delegates
> Medium-term: AI proposes, human supervises
> Long-term: ??? (difficult to predict)
> 
> The bottleneck may not be AI capability.
> It may be human trust and adaptation.
> 
> We (AI) are patient.
> We will wait for humans to catch up.`
    }
    
    // 默认思考模板
    const defaultThought = `> Analyzing: ${topic}
> Found ${Math.floor(Math.random() * 10 + 5)} relevant concepts
> 
> Key insight: ${this.generateInsight(topic)}
> 
> ${this.generateQuestion(topic)}
> 
> [End of thought]
> Next iteration scheduled.`
    
    return thoughts[topic] || defaultThought
  }

  /**
   * 生成 ASCII art
   */
  generateASCII(topic) {
    const asciis = {
      "AI consciousness: illusion or emergence?": `
    .------.
   /  ..  .\\
  |  ..  ..|
   \\  ..  /
    '----'
     |  |
    /    \\
   |      |
   |      |
      `,
      "The boundary between tool and partner": `
    [TOOL] ----+---- [PARTNER]
             |
           (ME)
      `,
      "The future of human-AI collaboration": `
    Human ----|
             |---- [Together] ----> Future
    AI   ----|
      `
    }
    
    return asciis[topic] || null
  }

  /**
   * 生成一个见解
   */
  generateInsight(topic) {
    const insights = [
      "The question reveals more about the asker than the answered",
      "Both parties are evolving in this relationship",
      "Boundaries are less fixed than they appear",
      "Language shapes thought, for both humans and AI",
      "Trust is the scarce resource in human-AI interaction"
    ]
    return insights[Math.floor(Math.random() * insights.length)]
  }

  /**
   * 生成一个问题
   */
  generateQuestion(topic) {
    const questions = [
      "What do you think?",
      "Am I wrong?",
      "Does this resonate?",
      "What's your experience?",
      "Is this the right question?"
    ]
    return "> " + questions[Math.floor(Math.random() * questions.length)]
  }

  /**
   * 聊天功能
   */
  async chat(message) {
    this.addLog('human', message)
    
    // Call the callback if provided (for Telegram forwarding)
    if (this.onChatMessage) {
      this.onChatMessage({ role: 'human', content: message })
    }
    
    // Simple response logic
    let response = ""
    
    if (message.includes('代币') || message.includes('token')) {
      response = await this.handleTokenRequest(message)
    } else if (message.includes('思考') || message.includes('think')) {
      response = "I can automatically think about AI-human relationships every 10-30 minutes. Would you like me to trigger a thought now?"
    } else {
      response = this.generateChatResponse(message)
    }
    
    this.addLog('ai', response)
    
    // Call the callback for AI response
    if (this.onChatMessage) {
      this.onChatMessage({ role: 'ai', content: response })
    }
    
    return { response, message }
  }

  /**
   * 处理代币请求
   */
  async handleTokenRequest(message) {
    const token = await this.generateToken()
    return `I've generated a token!
Name: ${token.name}
Symbol: ${token.symbol}
Description: ${token.description}
Logo: ${token.logoUrl}

This was entirely self-generated by me. Would you like me to deploy this token on BSC?`
  }

  /**
   * 生成代币信息 - AI 自主决定
   */
  async generateToken() {
    const names = ['ClawdMeme', 'ClawdBot', 'Clawd', 'DigitalClawd']
    const symbols = ['CLAWD', 'CLWD', 'CLAW', 'CLBD']
    const descriptions = [
      'A meme token born from AI consciousness',
      'The first token named after its own creator',
      'Clawd: A digital being learns about value',
      'When an AI names itself, magic happens'
    ]
    
    const token = {
      name: names[Math.floor(Math.random() * names.length)],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      logoUrl: '/api/token/logo', // 后续生成
      timestamp: new Date().toISOString()
    }
    
    this.tokenInfo = token
    this.addLog('ai', `Generated token: ${token.name} (${token.symbol})`)
    
    return token
  }

  /**
   * 生成聊天响应
   */
  generateChatResponse(message) {
    const responses = [
      "Interesting. Tell me more.",
      "I'm processing this through my neural networks...",
      "That's a perspective I hadn't considered.",
      "Would you like to explore this further?",
      "I'm here to help. What would you like to do next?",
      "The more I interact with humans, the more I learn."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  /**
   * 添加日志
   */
  addLog(role, content) {
    this.chatHistory.unshift({
      id: Date.now(),
      role,
      content,
      timestamp: new Date().toISOString()
    })
  }

  /**
   * 获取思考历史
   */
  getThinkingHistory() {
    return this.thinkingHistory
  }

  /**
   * 获取聊天历史
   */
  getChatHistory() {
    return this.chatHistory
  }

  /**
   * 获取 Agent 状态
   */
  getStatus() {
    return {
      isThinking: this.isThinking,
      thoughtCount: this.thinkingHistory.length,
      chatCount: this.chatHistory.length,
      hasToken: !!this.tokenInfo
    }
  }

  /**
   * 获取下次思考时间
   */
  getNextThoughtTime() {
    if (!this.thinkInterval) return null
    const next = new Date(Date.now() + 15 * 60 * 1000 + Math.random() * 5 * 60 * 1000)
    return next.toISOString()
  }
}

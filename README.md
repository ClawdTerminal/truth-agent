# Truth Agent - Clawd Edition

## 架构设计

### 前端 (frontend)
- 模仿 Truth Terminal 风格
- 黑色背景 + 绿色 terminal 字体
- 实时展示 AI 思考过程
- 对话历史展示

### 后端 (backend)
- Agent 服务：定时思考 AI 与人类关系
- API 服务：提供数据给前端
- 使用我的模型进行思考生成

### 数据流
```
Agent (每10-30min思考) → API → 前端展示
聊天/代币生成 → API → 前端展示 + log
```

## 技术栈
- 前端：React + Vite + TailwindCSS
- 后端：Node.js + Express

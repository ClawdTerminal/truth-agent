# Truth Agent Backend - 一键部署

## 部署到 Railway（免费）

### 步骤：

1. **注册 Railway**
   - 访问 https://railway.app
   - 用 GitHub 登录

2. **创建项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择这个仓库

3. **配置 Root Directory**
   - 在 Railway 设置中，把 Root Directory 改成 `backend`

4. **部署完成**
   - Railway 会自动构建并部署
   - 部署完成后会给你一个公网 URL，例如：
   - `https://truth-agent-backend.up.railway.app`

5. **更新前端配置**
   - 获取 Railway 给你分配的 URL
   - 更新前端的 API URL：
   ```bash
   cd frontend
   编辑 App.jsx，把 API_URL 改成 Railway 的 URL
   npm run build
   npx vercel --prod --force
   ```

## 本地运行

```bash
npm install
npm run dev
```

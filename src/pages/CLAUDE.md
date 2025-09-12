[根目录](../../../CLAUDE.md) > [src](../) > **pages**

# pages 页面路由模块

## 变更记录 (Changelog)

- **2025-09-12**: 初始化 pages 模块文档

## 模块职责

pages 模块负责定义应用的所有页面路由和 API 端点。主要包含用户界面页面和后端 API 接口，实现页面的渲染和 HTTP 请求的处理。

## 页面结构

### 前端页面
- **index.astro** - 主聊天界面页面
- **password.astro** - 密码验证页面

### API 端点
- **api/generate.ts** - AI 聊天生成 API
- **api/auth.ts** - 身份验证 API

## 入口与启动

### 页面路由入口
- **`/`** → `index.astro` - 主聊天页面
- **`/password`** → `password.astro` - 密码验证页面
- **`/api/generate`** → `api/generate.ts` - 聊天生成接口
- **`/api/auth`** → `api/auth.ts` - 身份验证接口

### 启动流程
1. 用户访问网站 → 检查是否需要密码验证
2. 需要验证 → 重定向到 `/password`
3. 验证成功 → 返回主聊天页面
4. 用户输入 → 调用 `/api/generate` 生成回复

## 对外接口

### 页面组件接口

#### index.astro
```astro
---
// 无显式 props，使用 Astro 页面约定
---
<Layout title="Gemini Pro Chat">
  <main>
    <Header />
    <Generator client:load />
  </main>
  <Footer />
</Layout>
```

#### password.astro
```astro
---
// 密码验证表单页面
---
```

### API 接口

#### /api/generate
```typescript
interface GenerateRequest {
  messages: ChatMessage[]
  time: number
  pass?: string
  sign: string
}

interface GenerateResponse {
  // 流式响应，无固定格式
}
```

#### /api/auth
```typescript
interface AuthRequest {
  pass: string
}

interface AuthResponse {
  code: number
  message?: string
}
```

## 关键依赖与配置

### 内部依赖
- `../components/Generator.tsx` - 主聊天组件
- `../components/Header.astro` - 头部组件
- `../components/Footer.astro` - 底部组件
- `../utils/openAI.ts` - AI API 调用
- `../utils/auth.ts` - 身份验证
- `../types.ts` - 类型定义

### 外部依赖
- `@fuyun/generative-ai` - Google Gemini API
- `js-sha256` - 签名算法

### 环境变量
- `GEMINI_API_KEY` - Google API 密钥
- `SITE_PASSWORD` - 站点访问密码
- `PUBLIC_SECRET_KEY` - 签名密钥
- `PUBLIC_MAX_HISTORY_MESSAGES` - 最大历史消息数

## 数据模型

### API 请求/响应模型

#### Generate API
```typescript
interface ChatMessage {
  role: 'model' | 'user'
  parts: { text: string }[]
}

interface GenerateRequestBody {
  messages: ChatMessage[]
  time: number
  pass?: string
  sign: string
}
```

#### Auth API
```typescript
interface AuthRequestBody {
  pass: string
}

interface AuthResponseBody {
  code: number
  message?: string
}
```

### 页面状态模型
```typescript
interface PageState {
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  messageHistory: ChatMessage[]
}
```

## 测试与质量

### API 测试策略
- **功能测试**: 验证 API 接口功能正确性
- **安全测试**: 测试身份验证和签名验证
- **性能测试**: 流式响应性能测试
- **错误处理**: 测试各种错误情况处理

### 页面测试策略
- **渲染测试**: 验证页面正确渲染
- **导航测试**: 测试页面间导航
- **响应式测试**: 验证不同设备适配
- **无障碍性**: 测试无障碍功能

### 质量保证
- API 参数验证
- 错误处理机制
- 安全措施实施
- 性能优化

## 常见问题 (FAQ)

### Q: 如何添加新的 API 端点？
A: 在 `api/` 目录下创建新的 `.ts` 文件，遵循 Astro API 路由约定。

### Q: 如何修改身份验证逻辑？
A: 修改 `api/auth.ts` 和相关工具函数。

### Q: 如何自定义 API 响应格式？
A: 修改对应 API 文件中的响应处理逻辑。

### Q: 如何添加新的页面？
A: 在 `pages/` 目录下创建新的 `.astro` 文件，文件名即为路由路径。

## 相关文件清单

### 页面文件
- `index.astro` - 主聊天页面 (34 行)
- `password.astro` - 密码验证页面 (65 行)

### API 文件
- `api/generate.ts` - AI 聊天生成 API (50 行)
- `api/auth.ts` - 身份验证 API (10 行)

### 配置文件
- 所有 API 路由遵循 Astro 文件系统路由
- 页面配置通过 Astro 前置脚本处理
- 环境变量通过 `import.meta.env` 访问

## 技术债务

1. **API 版本控制**: 缺少 API 版本管理
2. **请求限流**: 缺少 API 限流保护
3. **输入验证**: API 输入验证不够完善
4. **日志记录**: 缺少详细的 API 日志
5. **错误监控**: 缺少错误收集和监控
6. **API 文档**: 缺少自动生成的 API 文档

## 安全考虑

1. **身份验证**: 实现了密码保护和签名验证
2. **输入过滤**: 需要加强用户输入过滤
3. **速率限制**: 需要添加 API 调用限制
4. **敏感信息**: 环境变量正确处理
5. **CORS 配置**: 需要配置跨域访问策略

## 性能优化

1. **缓存策略**: API 响应缓存优化
2. **流式处理**: 已实现流式响应
3. **压缩传输**: 静态资源压缩
4. **CDN 部署**: 静态资源 CDN 加速
5. **数据库**: 考虑添加数据库支持持久化
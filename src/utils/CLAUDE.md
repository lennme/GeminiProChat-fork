[根目录](../../../CLAUDE.md) > [src](../) > **utils**

# utils 工具函数模块

## 变更记录 (Changelog)

- **2025-09-12**: 初始化 utils 模块文档

## 模块职责

utils 模块包含项目的核心工具函数和业务逻辑，主要负责 AI API 调用、身份验证、数据处理等关键功能。是连接前端界面和后端服务的桥梁。

## 工具函数列表

### 核心功能工具
- **openAI.ts** - Google Gemini API 封装和调用
- **auth.ts** - 身份验证和签名生成

## 入口与启动

### 主要入口点
- **openAI.ts** - AI 对话功能的主要入口
- **auth.ts** - 安全验证的主要入口

### 调用流程
1. 用户输入消息 → `auth.generateSignature()` 生成签名
2. 发送请求 → `openAI.startChatAndSendMessageStream()` 调用 AI API
3. 接收响应 → 流式处理 AI 回复
4. 验证请求 → `auth.verifySignature()` 验证请求合法性

## 对外接口

### openAI.ts 接口
```typescript
interface ChatMessage {
  role: 'model' | 'user'
  parts: { text: string }[]
}

export const startChatAndSendMessageStream = async(
  history: ChatMessage[], 
  newMessage: string
): Promise<ReadableStream>
```

### auth.ts 接口
```typescript
interface AuthPayload {
  t: number
  m: string
}

export const generateSignature = async(payload: AuthPayload): Promise<string>
export const verifySignature = async(payload: AuthPayload, sign: string): Promise<boolean>
```

## 关键依赖与配置

### 外部依赖
- **@fuyun/generative-ai** - Google Gemini API 官方封装
- **js-sha256** - SHA256 哈希算法实现

### 内部依赖
- **../types.ts** - 类型定义文件

### 环境变量配置
- `GEMINI_API_KEY` - Google API 密钥（必需）
- `API_BASE_URL` - 自定义 API 基础 URL（可选）
- `PUBLIC_SECRET_KEY` - 签名密钥（生产环境必需）

## 数据模型

### API 数据模型
```typescript
interface ChatMessage {
  role: 'model' | 'user'
  parts: { text: string }[]
}

interface AuthPayload {
  t: number      // 时间戳
  m: string      // 最后一条消息内容
}
```

### 配置模型
```typescript
interface GenerationConfig {
  maxOutputTokens: number
}

interface SafetySetting {
  category: string
  threshold: string
}
```

## 测试与质量

### 单元测试策略
- **API 调用测试**: 测试与 Google AI 的通信
- **签名验证测试**: 测试签名生成和验证逻辑
- **错误处理测试**: 测试各种异常情况处理
- **流式处理测试**: 测试流式响应的正确性

### 集成测试策略
- **端到端测试**: 完整的聊天流程测试
- **性能测试**: API 调用性能和响应时间
- **安全测试**: 签名验证和身份测试

### 质量保证
- TypeScript 类型安全
- 错误边界处理
- 环境变量验证
- API 响应验证

## 常见问题 (FAQ)

### Q: 如何修改使用的 AI 模型？
A: 在 `openAI.ts` 中修改 `getGenerativeModel({ model: 'gemini-2.0-flash' })` 的模型名称。

### Q: 如何调整 AI 的安全设置？
A: 修改 `openAI.ts` 中的 `safetySettings` 数组，调整各类安全过滤的阈值。

### Q: 如何自定义 API 基础 URL？
A: 设置 `API_BASE_URL` 环境变量，支持自定义代理服务器。

### Q: 签名验证失败怎么办？
A: 检查 `PUBLIC_SECRET_KEY` 环境变量配置，确保前后端密钥一致。

### Q: 如何增加新的哈希算法？
A: 在 `auth.ts` 的 `digestMessage` 函数中添加新的算法实现。

## 相关文件清单

### 核心工具文件
- `openAI.ts` - AI API 调用工具 (38 行)
- `auth.ts` - 身份验证工具 (29 行)

### 类型定义文件
- `../types.ts` - 共享类型定义

### 配置文件
- 环境变量通过 `import.meta.env` 访问
- API 配置直接在代码中定义

## 技术债务

1. **API 版本管理**: 缺少 API 版本控制机制
2. **重试机制**: 缺少 API 调用失败的重试逻辑
3. **连接池**: 缺少 HTTP 连接池优化
4. **缓存策略**: 缺少 API 响应缓存
5. **监控指标**: 缺少 API 调用监控和统计
6. **配置热更新**: 配置修改需要重启服务

## 安全考虑

1. **密钥管理**: API 密钥通过环境变量安全存储
2. **签名验证**: 实现了请求签名防篡改
3. **输入验证**: 需要加强 API 参数验证
4. **安全设置**: 已禁用所有内容过滤（生产环境需谨慎）
5. **错误处理**: 避免敏感信息泄露

## 性能优化

1. **流式处理**: 已实现流式响应提升用户体验
2. **连接复用**: 考虑 HTTP 连接复用
3. **请求压缩**: 考虑启用请求压缩
4. **缓存机制**: 考虑添加对话历史缓存
5. **并发控制**: 考虑添加并发请求限制

## 扩展建议

1. **多模型支持**: 支持切换不同的 AI 模型
2. **插件系统**: 支持自定义插件扩展功能
3. **中间件架构**: 实现请求处理中间件
4. **配置文件**: 支持外部配置文件
5. **日志系统**: 完善的日志记录和分析
6. **监控告警**: 集成监控和告警系统
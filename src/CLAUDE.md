[根目录](../../CLAUDE.md) > **src**

# src 源代码模块

## 变更记录 (Changelog)

- **2025-09-12**: 初始化 src 模块文档

## 模块职责

src 模块是整个项目的核心源代码目录，包含所有前端组件、页面、工具函数和布局模板。负责实现聊天界面的所有功能和交互逻辑。

## 目录结构

```
src/
├── components/          # UI 组件库
├── pages/             # 页面路由和 API 端点
├── layouts/           # 页面布局模板
├── utils/             # 工具函数
├── types.ts           # TypeScript 类型定义
├── env.d.ts           # 环境变量类型声明
├── shims.d.ts         # 类型垫片
├── slider.css         # 滑块组件样式
└── message.css        # 消息组件样式
```

## 入口与启动

### 主要入口点
- **页面入口**: `pages/index.astro` - 主聊天页面
- **API 入口**: `pages/api/generate.ts` - 聊天生成 API
- **布局入口**: `layouts/Layout.astro` - 全局布局

### 启动流程
1. 用户访问 `/` → `pages/index.astro`
2. 加载 `layouts/Layout.astro` 作为基础布局
3. 渲染 `components/Generator.tsx` 主要聊天组件
4. 调用 `pages/api/generate.ts` 进行 AI 对话

## 对外接口

### 页面路由
- `/` - 主聊天页面（需要密码验证）
- `/password` - 密码验证页面
- `/api/generate` - AI 聊天生成 API
- `/api/auth` - 身份验证 API

### 组件接口
- `Generator` - 主聊天组件，处理用户输入和 AI 响应
- `MessageItem` - 消息显示组件
- `ErrorMessageItem` - 错误消息显示组件
- `Header` - 页面头部组件
- `Footer` - 页面底部组件

## 关键依赖与配置

### 内部依赖
- `components/Generator.tsx` 依赖 `utils/openAI.ts` 进行 API 调用
- `pages/index.astro` 依赖 `utils/auth.ts` 进行身份验证
- 所有组件依赖 `types.ts` 进行类型检查

### 外部依赖
- `@fuyun/generative-ai` - Google Gemini API 封装
- `solid-js` - 响应式 UI 框架
- `js-sha256` - 签名生成算法
- `eventsource-parser` - 流式响应解析

## 数据模型

### 核心类型定义
```typescript
// 聊天消息
interface ChatMessage {
  role: 'model' | 'user'
  parts: ChatPart[]
}

// 聊天消息部分
interface ChatPart {
  text: string
}

// 错误消息
interface ErrorMessage {
  code: string
  message: string
}
```

### 状态管理
- **消息列表**: `ChatMessage[]` - 存储聊天历史
- **加载状态**: `boolean` - AI 响应加载状态
- **错误状态**: `ErrorMessage` - 当前错误信息
- **当前回复**: `string` - AI 正在生成的回复

## 测试与质量

### 代码质量工具
- **ESLint**: 代码规范检查
- **TypeScript**: 类型安全检查
- **UnoCSS**: CSS 样式检查

### 测试覆盖
当前项目主要依靠：
- 手动测试功能完整性
- 端到端 API 测试
- 组件渲染测试
- 用户反馈和错误报告

## 常见问题 (FAQ)

### Q: 如何修改 AI 模型？
A: 在 `utils/openAI.ts` 中修改 `model: 'gemini-2.0-flash'` 参数。

### Q: 如何添加新的安全设置？
A: 在 `utils/openAI.ts` 中的 `safetySettings` 数组中添加新的配置。

### Q: 如何自定义聊天历史限制？
A: 修改 `Generator.tsx` 中的 `maxHistoryMessages` 环境变量或默认值。

### Q: 如何添加新的页面？
A: 在 `pages/` 目录下创建新的 `.astro` 文件，遵循 Astro 路由约定。

## 相关文件清单

### 核心文件
- `types.ts` - 所有 TypeScript 类型定义
- `env.d.ts` - 环境变量类型声明
- `shims.d.ts` - 类型兼容性垫片

### 样式文件
- `slider.css` - 滑块组件样式
- `message.css` - 消息显示样式

### 配置文件
- 所有样式通过 `Layout.astro` 全局加载
- CSS 使用 UnoCSS 原子类
- 支持暗色主题切换

## 技术债务

1. **缺少单元测试**: 建议添加 Jest 或 Vitest 测试框架
2. **状态管理**: 考虑使用状态管理库如 SolidJS Store
3. **错误处理**: 需要更完善的错误边界和恢复机制
4. **国际化**: 当前仅支持多语言 README，界面需要国际化支持
5. **无障碍性**: 需要添加 ARIA 标签和键盘导航支持
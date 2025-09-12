[根目录](../../../CLAUDE.md) > [src](../) > **layouts**

# layouts 布局模块

## 变更记录 (Changelog)

- **2025-09-12**: 初始化 layouts 模块文档

## 模块职责

layouts 模块负责定义应用的全局页面布局结构，包括 HTML 骨架、头部元信息、全局样式和主题切换功能。提供一致的页面结构和基础样式。

## 布局组件列表

- **Layout.astro** - 主布局组件

## 入口与启动

### 主要入口点
- **Layout.astro** - 所有页面的基础布局

### 使用方式
```astro
---
import Layout from '../layouts/Layout.astro'
---

<Layout title="页面标题">
  <!-- 页面内容 -->
</Layout>
```

## 对外接口

### Layout 组件接口
```astro
---
export interface Props {
  title: string;
}

const { title } = Astro.props;
---
```

## 关键依赖与配置

### 内部依赖
- `virtual:pwa-info` - PWA 信息插件

### 环境变量
- `HEAD_SCRIPTS` - 头部脚本注入
- `PROD` - 生产环境标识

### 外部服务
- Google Fonts - 系统字体栈
- PWA 服务 - 渐进式 Web 应用支持

## 数据模型

### 主题配置
```typescript
interface ThemeConfig {
  mode: 'light' | 'dark'
  system: boolean
  storage: string | null
}
```

### PWA 配置
```typescript
interface PWAConfig {
  webManifest: {
    linkTag: string
  }
  registerSW: {
    scriptTag: string
  }
}
```

## 测试与质量

### 测试策略
- **渲染测试**: 验证布局正确渲染
- **主题测试**: 测试明暗主题切换
- **响应式测试**: 验证不同设备适配
- **PWA 测试**: 测试离线功能和安装

### 质量保证
- SEO 优化（meta 标签）
- 无障碍性支持
- 性能优化（资源加载）
- 浏览器兼容性

## 常见问题 (FAQ)

### Q: 如何自定义主题颜色？
A: 修改 CSS 变量 `--c-bg` 和 `--c-fg`。

### Q: 如何添加新的 meta 标签？
A: 在 `<head>` 部分添加新的 meta 标签。

### Q: 如何修改字体设置？
A: 更新 `font-family` CSS 属性。

### Q: 如何禁用 PWA 功能？
A: 移除 PWA 相关的脚本和标签。

## 相关文件清单

### 布局文件
- `Layout.astro` - 主布局组件 (106 行)

### 样式文件
- 内联全局样式
- 滚动条样式
- 响应式断点
- 主题切换动画

### 配置文件
- PWA 配置通过插件自动生成
- 环境变量动态注入

## 技术债务

1. **样式组织**: 全局样式可以考虑拆分为独立文件
2. **主题管理**: 考虑使用 CSS 变量管理系统主题
3. **SEO 优化**: 可以添加更多 SEO 相关的 meta 标签
4. **性能优化**: 考虑资源预加载和优化
5. **无障碍性**: 需要添加更多的 ARIA 标签

## 性能优化

1. **资源加载**: 优化 CSS 和 JavaScript 加载顺序
2. **缓存策略**: 合理设置缓存头
3. **图片优化**: 优化图标和图片资源
4. **代码分割**: 考虑按需加载非关键资源
5. **字体优化**: 优化字体加载策略
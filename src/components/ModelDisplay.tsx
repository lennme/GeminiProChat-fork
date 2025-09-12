import type { ModelDisplayProps } from '@/types'

const ModelDisplay = (props: ModelDisplayProps) => {
  const getModelName = () => {
    return props.modelName || import.meta.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash'
  }

  const getDisplayName = () => {
    const model = getModelName()

    // 提取模型名称的友好显示
    if (model.includes('gemini-2.5-flash')) return 'Gemini 2.5 Flash'
    if (model.includes('gemini-2.0-flash')) return 'Gemini 2.0 Flash'
    if (model.includes('gemini-1.5-pro')) return 'Gemini 1.5 Pro'
    if (model.includes('gemini-pro')) return 'Gemini Pro'

    // 如果是自定义名称，返回简化版本
    return model.replace(/^gemini-/, '').replace(/-/g, ' ')
  }

  const isInlineMode = props.inlineMode || false

  if (isInlineMode) {
    return (
      <div
        class={`model-display-inline ${props.className || ''}`}
        title={`当前使用的模型: ${getModelName()}`}
      >
        <span class="model-icon-inline">🤖</span>
        <span class="model-name-inline">{getDisplayName()}</span>
      </div>
    )
  }

  return (
    <div
      class={`model-display ${props.className || ''}`}
      title={`当前使用的模型: ${getModelName()}`}
    >
      <span class="model-icon">🤖</span>
      <span class="model-name">{getDisplayName()}</span>
    </div>
  )
}

export default ModelDisplay

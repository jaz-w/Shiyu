import { parseDataType, normalizeUrl } from '@jaz-w/shiyu-utils'

interface UnprocessedEnvItem {
  viteEnvKey: string
  nodeEnvKey: string
  viteEnvValue: string
  nodeEnvValue: string | undefined
}

/**
 * 将 VITE_XX 允许通过 NODE_XX 进行覆盖
 * @returns 转换后的所有环境变量对象
 */
export function convertNodeEnvToViteEnv(viteEnv: Record<string, string>) {
  const unprocessedEnvs: UnprocessedEnvItem[] = []

  Object.entries(viteEnv).forEach(([viteEnvKey, viteEnvValue]) => {
    if (viteEnvKey.startsWith('VITE_')) {
      const nodeEnvKey = viteEnvKey.replace('VITE_', 'NODE_')
      const nodeEnvValue = process.env[nodeEnvKey]
      unprocessedEnvs.push({ viteEnvKey, viteEnvValue, nodeEnvKey, nodeEnvValue })
    }
  })

  const objectEnv: ImportMetaEnv = unprocessedEnvs.reduce((pre, item) => {
    let newValue: any = item.viteEnvValue

    if (item.nodeEnvValue) {
      newValue = item.nodeEnvValue
    }

    newValue = normalizeUrl(newValue)
    newValue = parseDataType(newValue)

    // @ts-expect-error
    pre[item.viteEnvKey] = newValue

    return pre
  }, {} as ImportMetaEnv)

  return objectEnv
}

/**
 * 将 Vite 环境变量对象转换为 vite的 define 属性
 * @param viteEnv Vite 环境变量对象
 * @returns vite的 define 属性
 */
export function convertViteEnvToViteDefineObject(viteEnv: ViteEnv) {
  const viteDefineObj: Record<string, any> = {}

  Object.entries(viteEnv).forEach(([key, value]) => {
    viteDefineObj[`import.meta.env.${key}`] = JSON.stringify(value)
  })

  return viteDefineObj
}

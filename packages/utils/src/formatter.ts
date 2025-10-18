/**
 * 规范化 URL，移除多余的斜杠并保留协议、路径、查询与哈希
 * @example
 * normalizeUrl('http://localhost:3000')          => 'http://localhost:3000'
 * normalizeUrl('https://www.example.com/')       => 'https://www.example.com'
 * normalizeUrl('https://www.example.com/path/')  => 'https://www.example.com/path'
 * normalizeUrl('vscode://some/path')             => 'vscode://some/path'
 */
export function normalizeUrl(url: string): string
export function normalizeUrl(url: null | undefined): null
export function normalizeUrl(url?: string | null): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url)

    // 某些自定义协议（如 vscode://）其 origin 可能为 "null"
    if (parsed.origin && parsed.origin !== 'null') {
      const pathname = parsed.pathname === '/' ? '' : parsed.pathname.replace(/\/+$/, '')
      return `${parsed.origin}${pathname}${parsed.search}${parsed.hash}`
    }

    // 对于无 origin 的特殊协议，返回原始输入
    return url
  } catch {
    // 无法解析（非合法 URL）时返回原始输入
    return url
  }
}

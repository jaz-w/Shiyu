import { type Rule } from 'unocss'

export default [
  [/^wh-(\d+)px$/, ([, d]) => ({ width: `${d}px`, height: `${d}px` })],
  [/^wh-(\d+)$/, ([, d]) => ({ width: `${Number(d) * 4}px`, height: `${Number(d) * 4}px` })],

  [/^flex-(\d+)%$/, ([, d]) => ({ flex: `1 1 ${d}%` })],
] as Rule[]

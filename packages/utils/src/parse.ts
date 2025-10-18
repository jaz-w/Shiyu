import { cloneDeep, isString, isArray, isPlainObject } from 'lodash-es'

/**
 * 解析数据类型
 * @example
 * 'true' => true
 * 'false' => false
 * '123' => 123
 * '12.34' => 12.34
 * '[1,2,3]' => [1,2,3]
 * '{"a":1,"b":2}' => {a:1,b:2}
 * [ '1', '2', '3' ] => [1,2,3]
 * @param value 待解析的值
 * @returns 解析后的值
 */
export function parseDataType(value: unknown): unknown {
  if (value === null || value === void 0) return value

  let newValue: unknown = isArray(value) || isPlainObject(value) ? cloneDeep(value) : value

  if (isString(newValue)) {
    const v = newValue.trim()

    // boolean
    if (v === 'true' || v === 'false') return v === 'true'

    // array/object
    if ((v.startsWith('[') && v.endsWith(']')) || (v.startsWith('{') && v.endsWith('}'))) {
      try {
        const parsed = JSON.parse(v)
        return parseDataType(parsed)
      } catch {
        return v.startsWith('[') ? [] : {}
      }
    }

    // number (int or float)
    if (/^-?\d+(\.\d+)?$/.test(v)) return v.includes('.') ? parseFloat(v) : Number(v)

    return v
  }

  // Array
  if (isArray(newValue)) {
    return (newValue as unknown[]).map(item => parseDataType(item))
  }

  // Plain object
  if (isPlainObject(newValue)) {
    const obj = {} as Record<string, unknown>
    for (const key of Object.keys(newValue as Record<string, unknown>)) {
      obj[key] = parseDataType((newValue as Record<string, unknown>)[key])
    }
    return obj
  }

  return newValue
}

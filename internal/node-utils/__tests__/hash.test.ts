import { createHash } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { generatorContentHash } from '../src/hash'

describe('generatorContentHash', () => {
  // 测试生成内容的 MD5 哈希值
  it('should generate an MD5 hash for the content', () => {
    const content = 'example content'
    const expectedHash = createHash('md5').update(content, 'utf8').digest('hex')
    const actualHash = generatorContentHash(content)
    expect(actualHash).toBe(expectedHash)
  })

  // 测试生成指定长度的 MD5 哈希值
  it('should generate an MD5 hash with specified length', () => {
    const content = 'example content'
    const hashLength = 10
    const generatedHash = generatorContentHash(content, hashLength)
    expect(generatedHash).toHaveLength(hashLength)
  })

  // 测试正确生成指定长度的哈希值
  it('should correctly generate the hash with specified length', () => {
    const content = 'example content'
    const hashLength = 8
    const expectedHash = createHash('md5')
      .update(content, 'utf8')
      .digest('hex')
      .slice(0, hashLength)
    const generatedHash = generatorContentHash(content, hashLength)
    expect(generatedHash).toBe(expectedHash)
  })

  // 测试在未提供哈希长度参数时返回完整哈希值
  it('should return full hash if hash length parameter is not provided', () => {
    const content = 'example content'
    const expectedHash = createHash('md5').update(content, 'utf8').digest('hex')
    const actualHash = generatorContentHash(content)
    expect(actualHash).toBe(expectedHash)
  })

  // 测试处理空内容时的行为
  it('should handle empty content', () => {
    const content = ''
    const expectedHash = createHash('md5').update(content, 'utf8').digest('hex')
    const actualHash = generatorContentHash(content)
    expect(actualHash).toBe(expectedHash)
  })
})

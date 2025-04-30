import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'
import { consola } from 'consola'

// 从指定文件路径读取 JSON 格式的数据并解析为 JavaScript 对象
export async function readJSON(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    consola.error('reading JSON file:', error)
    throw error
  }
}

// 将数据以 JSON 格式写入指定文件路径，如果目录不存在则创建
export async function outputJSON(filePath: string, data: any, spaces: number = 2) {
  try {
    const dir = dirname(filePath)
    await fs.mkdir(dir, { recursive: true })
    const jsonData = JSON.stringify(data, null, spaces)
    await fs.writeFile(filePath, jsonData, 'utf8')
  } catch (error) {
    consola.error('writing JSON file:', error)
    throw error
  }
}

// 确保指定文件路径的文件存在，如果目录不存在则创建，如果文件不存在则创建空文件
export async function ensureFile(filePath: string) {
  try {
    const dir = dirname(filePath)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(filePath, '', { flag: 'a' })
  } catch (error) {
    consola.error('ensuring file:', error)
    throw error
  }
}

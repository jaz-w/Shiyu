import { copyFile, mkdir, readdir, readFile, readlink, symlink, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import { consola } from 'consola'

// 从指定文件路径读取 JSON 格式的数据并解析为 JavaScript 对象
export async function readJSON(filePath: string) {
  try {
    const data = await readFile(filePath, 'utf8')
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
    await mkdir(dir, { recursive: true })
    const jsonData = JSON.stringify(data, null, spaces)
    await writeFile(filePath, jsonData, 'utf8')
  } catch (error) {
    consola.error('writing JSON file:', error)
    throw error
  }
}

// 确保指定文件路径的文件存在，如果目录不存在则创建，如果文件不存在则创建空文件
export async function ensureFile(filePath: string) {
  try {
    const dir = dirname(filePath)
    await mkdir(dir, { recursive: true })
    await writeFile(filePath, '', { flag: 'a' })
  } catch (error) {
    consola.error('ensuring file:', error)
    throw error
  }
}

// 深度拷贝文件目录
export async function cloneDir(src: string, dest: string) {
  // 确保目标文件夹存在
  await mkdir(dest, { recursive: true })

  // 读取源目录内容
  const entries = await readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (entry.isDirectory()) {
      // 递归复制子目录
      await cloneDir(srcPath, destPath)
    } else if (entry.isFile()) {
      // 复制文件
      await copyFile(srcPath, destPath)
    } else if (entry.isSymbolicLink()) {
      // 处理符号链接
      const link = await readlink(srcPath)
      await symlink(link, destPath)
    }
  }
}

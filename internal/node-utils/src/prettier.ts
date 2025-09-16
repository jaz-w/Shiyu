import { readFile, writeFile, stat, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { format, getFileInfo, resolveConfig } from 'prettier'

/**
 * 格式化单个文件
 */
async function formatFile(filepath: string) {
  const prettierOptions = await resolveConfig(filepath, {})
  const fileInfo = await getFileInfo(filepath)

  // 跳过不能解析的文件
  if (!fileInfo.inferredParser) {
    return null
  }

  const input = await readFile(filepath, 'utf8')
  const output = await format(input, {
    ...prettierOptions,
    parser: fileInfo.inferredParser as any,
  })

  if (output !== input) {
    await writeFile(filepath, output, 'utf8')
    console.log(`Formatted: ${filepath}`)
  }

  return output
}

/**
 * 递归格式化文件/文件夹
 */
export async function prettierFormat(targetPath: string) {
  const stats = await stat(targetPath)

  if (stats.isDirectory()) {
    const entries = await readdir(targetPath, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(targetPath, entry.name)
      if (entry.isDirectory()) {
        await prettierFormat(fullPath) // 递归
      } else if (entry.isFile()) {
        await formatFile(fullPath)
      }
    }
  } else if (stats.isFile()) {
    await formatFile(targetPath)
  }
}

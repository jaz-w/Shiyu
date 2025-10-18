import { existsSync } from 'node:fs'

import { colors, fs } from '@jaz-w/shiyu-node-utils'
import { normalizePath, type Plugin } from 'vite'

/**
 * 读取文件中的类型声明，并将其添加到 eslint 配置中
 * @example declare interface Xxxx
 * @example declare type Xxxx
 * @example declare const Xxxx
 * @example declare namespace Xxxx
 */
const globalTypeRegex = /declare\s+(interface|type|const|namespace)\s+(\w+)/g

export function viteCustomResolveGlobalType(
  options: {
    filepath?: string[]
    eslintrcFilepath?: string
  } = {}
): Plugin {
  const name = 'vite:resolve-global-type'

  return {
    name,

    async watchChange(id, change) {
      if (change.event === 'delete') return
      const { filepath = [], eslintrcFilepath = '' } = options

      if (!eslintrcFilepath || !filepath.length) return

      const eslintrcFile = normalizePath(eslintrcFilepath)

      const eslintrcFileContent = await fs.readFile(eslintrcFile, { encoding: 'utf-8' })

      const eslintrcFileJson = JSON.parse(eslintrcFileContent) as {
        globals: Record<string, boolean>
      }

      if (!existsSync(eslintrcFile)) return

      /** 本次添加的全局类型 */
      const addList: string[] = []

      for await (let file of filepath) {
        file = normalizePath(file)

        if (existsSync(file)) {
          const fileContent = await fs.readFile(file, { encoding: 'utf-8' })
          const declareMatches = (fileContent.match(globalTypeRegex) || []) as string[]

          declareMatches.forEach(declareMatch => {
            const [_, _type, name] = declareMatch.split(' ')
            if (!eslintrcFileJson.globals[name!]) {
              eslintrcFileJson.globals[name!] = true
              addList.push(name!)
            }
          })
        }
      }

      const newEslintrcFileJson = JSON.stringify(eslintrcFileJson, null, 2)
      if (newEslintrcFileJson !== eslintrcFileContent && addList.length) {
        const addMessage = '\n Add: ' + addList.map(item => `"${colors.green(item)}"`).join(', ')

        console.log(`${colors.blue(`[${name}]`)}: Update ${eslintrcFile}${addMessage}`)
        setTimeout(() => fs.writeFile(eslintrcFile, newEslintrcFileJson), 200)
      }
    },
  }
}

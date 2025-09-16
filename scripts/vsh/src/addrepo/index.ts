import type { CAC } from 'cac'

import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdir, stat } from 'node:fs/promises'

import { select, text, isCancel, cancel } from '@clack/prompts'

import {
  findMonorepoRoot,
  prettierFormat,
  consola,
  toPosixPath,
  colors,
  cloneDir,
} from '@shiyu/node-utils'

const repoRoot = findMonorepoRoot()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templatesRoot = join(__dirname)

export function defineAddrepoCommand(cli: CAC) {
  cli
    .command('addrepo [name]', 'Add a new package/app from template')
    .option(
      '--template <template>',
      'Template name (folder under this addrepo directory, e.g. template-*)'
    )
    .option('--dir <dir>', 'Destination parent directory under repo root (default: packages)', {
      default: 'packages',
    })
    .option('--list', 'List available templates')
    .action(
      async (name?: string, options?: { template?: string; dir?: string; list?: boolean }) => {
        const templates = (await readdir(templatesRoot, { withFileTypes: true }))
          .filter(e => e.isDirectory() && e.name.startsWith('template-'))
          .map(e => e.name)

        try {
          if (templates.length === 0) {
            consola.error('No templates found in', templatesRoot)
            process.exit(1)
          }

          // 如果传了 --list，则打印可用模板并退出（参考 Vite create 帮助格式）
          if (options?.list) {
            const { yellow, green, cyan, magenta, redBright, red, blue, blueBright } = colors as any
            const colorFns = [yellow, green, cyan, cyan, magenta, redBright, red, blue, blueBright]

            console.log('Available templates:')

            templates.forEach((t, i) => {
              const color = colorFns[i % colorFns.length] || ((s: string) => s)
              console.log('  ' + color(t))
            })

            process.exit(0)
          }

          let chosenTemplate = options?.template
          if (!chosenTemplate) {
            const res = await select<string>({
              message: 'Select a template:',
              options: templates.map(t => ({ label: t, value: t })),
            })

            if (isCancel(res) || !res) {
              cancel('Cancelled')
              process.exit(0)
            }
            chosenTemplate = res
          } else if (!templates.includes(chosenTemplate)) {
            consola.error(
              `Template "${chosenTemplate}" not found. Available: ${templates.join(', ')}`
            )
            process.exit(1)
          }

          // name
          let pkgName = name
          if (!pkgName) {
            const res = await text({ message: 'Package name:' })

            if (isCancel(res) || !res) {
              cancel('Cancelled')
              process.exit(0)
            }
            pkgName = res.trim()
          }

          if (!pkgName) {
            consola.error('Invalid name')
            process.exit(1)
          }

          const destParent = options?.dir ?? 'packages'
          const targetDir = join(repoRoot, destParent, pkgName)
          // ensure not exists
          try {
            const s = await stat(targetDir)
            if (s) {
              consola.error('Target already exists:', targetDir)
              process.exit(1)
            }
          } catch (error) {
            // not exists, ok
          }

          const templateDir = join(templatesRoot, chosenTemplate!)
          await cloneDir(templateDir, targetDir)
          await prettierFormat(targetDir)

          consola.success(
            `Created ${pkgName} from ${chosenTemplate} → ${toPosixPath(relative(repoRoot, targetDir))}`
          )
        } catch (error) {
          consola.error('Failed to add repo:', error instanceof Error ? error.message : error)
          process.exit(1)
        }
      }
    )
}

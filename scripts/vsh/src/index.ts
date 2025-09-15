import { colors, consola } from '@shiyu/node-utils'

import { cac } from 'cac'

import { version } from '../package.json'
import { defineCheckCircularCommand } from './check-circular'
import { defineDepcheckCommand } from './check-dep'
import { defineCodeWorkspaceCommand } from './code-workspace'
import { defineLintCommand } from './lint'
import { definePubLintCommand } from './publint'
import { defineAddrepoCommand } from './addrepo'

// 命令描述
const COMMAND_DESCRIPTIONS = {
  'check-circular': 'Check for circular dependencies',
  'check-dep': 'Check for unused dependencies',
  'code-workspace': 'Manage VS Code workspace settings',
  lint: 'Run linting on the project',
  publint: 'Check package.json files for publishing standards',
  addrepo: 'Add a package/app to the monorepo',
} as const

/**
 * Initialize and run the CLI
 */
async function main(): Promise<void> {
  try {
    const vsh = cac('vsh')

    // Register commands
    defineLintCommand(vsh)
    definePubLintCommand(vsh)
    defineCodeWorkspaceCommand(vsh)
    defineCheckCircularCommand(vsh)
    defineDepcheckCommand(vsh)
    defineAddrepoCommand(vsh)

    // Handle invalid commands
    vsh.on('command:*', ([cmd]) => {
      consola.error(
        colors.red(`Invalid command: ${cmd}`),
        '\n',
        colors.yellow('Available commands:'),
        '\n',
        Object.entries(COMMAND_DESCRIPTIONS)
          .map(([cmd, desc]) => `  ${colors.cyan(cmd)} - ${desc}`)
          .join('\n')
      )
      process.exit(1)
    })

    // Set up CLI
    vsh.usage('vsh <command> [options]')
    vsh.help()
    vsh.version(version)

    // Parse arguments
    vsh.parse()
  } catch (error) {
    consola.error(
      colors.red('An unexpected error occurred:'),
      '\n',
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  }
}

// Run the CLI
main().catch(error => {
  consola.error(
    colors.red('Failed to start CLI:'),
    '\n',
    error instanceof Error ? error.message : error
  )
  process.exit(1)
})

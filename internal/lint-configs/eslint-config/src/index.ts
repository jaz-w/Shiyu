import type { Linter } from 'eslint'

import {
  command,
  disableds,
  ignores,
  importPluginConfig,
  javascript,
  jsdoc,
  jsonc,
  node,
  perfectionist,
  prettier,
  react,
  regexp,
  test,
  turbo,
  typescript,
  unicorn,
  vue,
} from './configs'
import { customConfig } from './custom-config'

type FlatConfig = Linter.Config | Linter.Config[]

async function defineConfig(config: Linter.Config[] = []) {
  const configs: FlatConfig[] = [
    vue(),
    react(),
    javascript(),
    ignores(),
    prettier(),
    typescript(),
    jsonc(),
    disableds(),
    importPluginConfig(),
    node(),
    perfectionist(),
    jsdoc(),
    unicorn(),
    test(),
    regexp(),
    command(),
    turbo(),
    ...customConfig,
    ...config,
  ]

  return configs.flat()
}

export { defineConfig }

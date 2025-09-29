import type { Linter } from 'eslint'

import pluginPrettier from 'eslint-plugin-prettier'

export function prettier(): Linter.Config[] {
  return [
    {
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ]
}

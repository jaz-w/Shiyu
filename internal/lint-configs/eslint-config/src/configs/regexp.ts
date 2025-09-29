import type { Linter } from 'eslint'

import pluginRegexp from 'eslint-plugin-regexp'

export function regexp(): Linter.Config[] {
  return [
    {
      plugins: {
        regexp: pluginRegexp,
      },
      rules: {
        ...pluginRegexp.configs.recommended.rules,
      },
    },
  ]
}

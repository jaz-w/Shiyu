import type { Linter } from 'eslint'

import * as pluginTurbo from 'eslint-config-turbo'

export function turbo(): Linter.Config[] {
  return [
    {
      plugins: {
        turbo: pluginTurbo,
      },
    },
  ]
}

import type { Linter } from 'eslint'

import pluginNode from 'eslint-plugin-n'

export function node(): Linter.Config[] {
  return [
    {
      plugins: {
        n: pluginNode,
      },
      rules: {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-extraneous-import': [
          'error',
          {
            allowModules: [
              'vue',
              'react',
              'unbuild',
              'vitest',
              'vite',
              '@vue/test-utils',
              '@jaz-w/shiyu-vite-config',
              '@jaz-w/shiyu-unocss-config',
              '@playwright/test',
            ],
          },
        ],
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-unsupported-features/es-syntax': [
          'error',
          {
            ignores: [],
            version: '>=18.0.0',
          },
        ],
        'n/prefer-global/buffer': ['error', 'never'],
        // 'n/no-missing-import': 'off',
        'n/prefer-global/process': ['error', 'never'],
        'n/process-exit-as-throw': 'error',
      },
    },
    {
      files: ['scripts/**/*.?([cm])[jt]s?(x)', 'internal/**/*.?([cm])[jt]s?(x)'],
      rules: {
        'n/prefer-global/process': 'off',
      },
    },
  ]
}

import type { Linter } from 'eslint'

import perfectionistPlugin from 'eslint-plugin-perfectionist'

export function perfectionist(): Linter.Config[] {
  return [
    perfectionistPlugin.configs['recommended-natural'],
    {
      rules: {
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                'shiyu-type': ['^@jaz-w/shiyu-.+'],
                'vue-type': ['^vue$', '^vue-.+', '^@vue/.+'],
                'react-type': ['^react$', '^react-.+', '^@react/.+'],
              },
              value: {
                shiyu: ['^@jaz-w/shiyu-.+'],
                vue: ['^vue$', '^vue-.+', '^@vue/.+'],
                react: ['^react$', '^react-.+', '^@react/.+'],
              },
            },
            environment: 'node',
            groups: [
              ['external-type', 'builtin-type', 'type'],
              'vue-type',
              'react-type',
              'shiyu-type',
              ['parent-type', 'sibling-type', 'index-type'],
              ['internal-type'],
              'builtin',
              'vue',
              'react',
              'shiyu',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              'side-effect',
              'side-effect-style',
              'style',
              'object',
              'unknown',
            ],
            internalPattern: ['^#/.+'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'off',
          {
            customGroups: {
              items: 'items',
              list: 'list',
              children: 'children',
            },
            groups: ['unknown', 'items', 'list', 'children'],
            ignorePattern: ['children'],
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ]
}

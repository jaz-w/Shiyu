import type { Linter } from 'eslint'
import { interopDefault } from '../util'

export async function react(): Promise<Linter.Config[]> {
  const [pluginReact, pluginReactHooks, pluginA11y, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-jsx-a11y')),
    // @ts-expect-error missing types
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      files: ['**/*.{jsx,tsx}'],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          sourceType: 'module',
        },
      },
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        // @ts-expect-error missing types
        'jsx-a11y': pluginA11y,
      },
      rules: {
        ...pluginReact.configs?.recommended?.rules,
        ...pluginReactHooks.configs?.recommended?.rules,
        ...pluginA11y.configs?.recommended?.rules,

        // React 常见规则
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-no-useless-fragment': 'error',
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react/jsx-tag-spacing': [
          'error',
          {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
          },
        ],

        // Hooks 规则
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // JSX 可读性
        'react/jsx-pascal-case': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-key': 'error',

        // 可访问性
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-is-valid': 'error',
        'jsx-a11y/no-autofocus': 'warn',

        // TS + React 风格
        'react/prop-types': 'off', // 使用 TS 代替 prop-types
        'react/react-in-jsx-scope': 'off', // React 17+ 不需要引入 React
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ]
}

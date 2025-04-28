export default {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: true,
  overrides: [
    {
      files: [
        '*.json5',
      ],
      options: {
        quoteProps: 'preserve',
        singleQuote: false,
      },
    },
  ],
  printWidth: 100,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}
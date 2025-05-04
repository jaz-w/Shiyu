export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md'],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['*.(html|vue)', '**/*.(html|vue)'],
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global', 'deep'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
    {
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue/scss'],
      files: ['*.scss', '**/*.scss'],
    },
  ],
  plugins: [
    'stylelint-order',
    '@stylistic/stylelint-plugin',
    'stylelint-prettier',
    'stylelint-scss',
  ],
  rules: {
    // unocss @apply
    'at-rule-no-deprecated': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'ignores',
          'include',
          'mixin',
          'if',
          'else',
          'media',
          'for',
          'at-root',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'each',
          'use',
          'forward',
          'return',
        ],
      },
    ],

    /**
     * 可选值: 'number' | 'percentage'
     * number: 0-1
     * percentage: 0%-100%
     */
    'alpha-value-notation': 'number',

    /**
     * 可选值: 'legacy' | 'modern'
     * legacy:  rgb(255, 0, 0)
     * modern:  rgb(255 12 12)
     */
    'color-function-notation': [
      'legacy',
      {
        ignore: ['with-var-inside'],
      },
    ],
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'font-family-no-missing-generic-family-keyword': null,
    'function-no-unknown': null,
    'import-notation': null,

    /** 微信小程序尺寸单位 */
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],

    /**
     * 可选值: 'content' | 'prefix'
     * content 会将媒体查询的 max-width 等转为 >= 这种,部分手机浏览器完全不支持
     */
    'media-feature-range-notation': 'prefix',
    'named-grid-areas-no-invalid': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'no-duplicate-selectors': null,
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          name: 'supports',
          type: 'at-rule',
        },
        {
          name: 'media',
          type: 'at-rule',
        },
        {
          name: 'include',
          type: 'at-rule',
        },
        'rules',
      ],
      { severity: 'error' },
    ],
    'prettier/prettier': true,
    /** -webkit- 禁止自动修复-webkit-前缀 */
    'property-no-vendor-prefix': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'ignores',
          'include',
          'mixin',
          'if',
          'else',
          'media',
          'for',
          'at-root',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'each',
          'use',
          'forward',
          'return',
        ],
      },
    ],
    'scss/operator-no-newline-after': null,
    'selector-class-pattern':
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:[.+])?$',

    'selector-not-notation': null,

    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'value-no-vendor-prefix': null,
  },
}

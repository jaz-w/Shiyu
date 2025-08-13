import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { presetRemToPx } from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  presetAttributify,
  presetTagify,
  presetWebFonts,
  transformerAttributifyJsx,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import shortcuts from './shortcuts'
import rules from './rules'

export default defineConfig({
  presets: [
    // Unocss 属性化预设. 更多: https://unocss.nodejs.cn/presets/attributify
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: true,
    }),

    // Unocss 字体预设. 更多: https://unocss.nodejs.cn/presets/web-fonts
    presetWebFonts(),

    // 旧版兼容预设. 更多: https://unocss.nodejs.cn/presets/legacy-compat
    presetLegacyCompat({
      commaStyleColorFunction: true,
    }),

    // Unocss 标签化预设. 更多: https://unocss.nodejs.cn/presets/tagify
    presetTagify({ prefix: 'un-' }),

    // Unocss Rem 转 px 预设. 更多: https://unocss.nodejs.cn/presets/rem-to-px
    presetRemToPx(),
  ],

  transformers: [
    // UnoCSS 启用 Windi CSS 的 变体组特性. 更多: https://unocss.nodejs.cn/transformers/variant-group
    transformerVariantGroup(),

    // UnoCSS 的指令转换器，支持 @apply、@screen 和 theme() 指令. 更多: https://unocss.nodejs.cn/transformers/directives
    transformerDirectives(),

    // UnoCSS 在JSX/TSX 中支持 无值的属性化. 更多: https://unocss.nodejs.cn/transformers/attributify-jsx
    transformerAttributifyJsx(),

    // 编译类转换器,将一组类编译为一个类.更多: https://unocss.nodejs.cn/transformers/compile-class
    transformerCompileClass(),
  ],

  shortcuts,
  rules,
})

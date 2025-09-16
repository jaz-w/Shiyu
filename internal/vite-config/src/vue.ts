import type { PluginOption } from 'vite'

import type { GetOptions } from './type'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default ({
  vueOptions,
  vueJsxOptions,
}: {
  vueJsxOptions?: GetOptions<typeof vueJsx>
  vueOptions?: GetOptions<typeof vue>
}) => {
  defineConfig({
    plugins: [vue(vueOptions), vueJsx(vueJsxOptions)] as PluginOption[],
  })
}

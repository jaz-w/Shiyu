import { defineConfig, type PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { type GetOptions } from './type'

export default ({
  vueOptions,
  vueJsxOptions,
}: {
  vueOptions?: GetOptions<typeof vue>
  vueJsxOptions?: GetOptions<typeof vueJsx>
}) => {
  defineConfig({
    plugins: [vue(vueOptions), vueJsx(vueJsxOptions)] as PluginOption[],
  })
}

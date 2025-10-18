import { type GetOptions } from '../../type'

import { merge } from 'lodash-es'
import { loadEnv, type PluginOption, type ConfigEnv } from 'vite'
import { convertNodeEnvToViteEnv } from '../../helper'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'unplugin-vue-markdown/vite'

export type VuePluginOptions = Partial<{
  vue: GetOptions<typeof vue>
  vueJsx: GetOptions<typeof vueJsx>
  markdown: GetOptions<typeof Markdown>
}>

export function createVuePluginOptions(
  configEnv: ConfigEnv,
  options?: VuePluginOptions
): PluginOption[] {
  const env = loadEnv(configEnv.mode, process.cwd())
  const viteEnv = convertNodeEnvToViteEnv(env)

  return [
    vue(merge({ include: [/\.vue$/, /\.md$/] } as VuePluginOptions['vue'], options?.vue)),

    vueJsx(merge({} as VuePluginOptions['vueJsx'], options?.vueJsx)),

    Markdown(merge({}, options?.markdown)),
  ] as PluginOption[]
}

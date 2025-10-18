import { loadEnv, normalizePath, type PluginOption, type ConfigEnv } from 'vite'

import type { GetOptions } from '../../type'

import Legacy from '@vitejs/plugin-legacy'
import SSL from '@vitejs/plugin-basic-ssl'
import Checker from 'vite-plugin-checker'
import Progress from 'vite-plugin-progress'

import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer'

import { convertNodeEnvToViteEnv } from '../../helper'
import { viteCustomResolveGlobalType } from './resolveGlobalType'
import { merge } from 'lodash-es'

export type CommonPluginOptions = Partial<{
  legacy: GetOptions<typeof Legacy>
  ssl: GetOptions<typeof SSL>
  checker: GetOptions<typeof Checker>
  progress: GetOptions<typeof Progress>
  icon: GetOptions<typeof Icons>
  autoImport: GetOptions<typeof AutoImport>
  resolveGlobalType: GetOptions<typeof viteCustomResolveGlobalType>
}>

export function createCommonPluginOptions(
  configEnv: ConfigEnv,
  options?: CommonPluginOptions
): PluginOption[] {
  const rootPath = process.cwd()
  const env = loadEnv(configEnv.mode, rootPath)
  const viteEnv = convertNodeEnvToViteEnv(env)

  return [
    Legacy(
      merge({ modernPolyfills: ['es.global-this', 'es.string.replace-all'] }, options?.legacy)
    ),

    Checker(options?.checker ?? { vueTsc: true }),

    Progress(options?.progress),

    Icons(options?.icon ?? { autoInstall: true }),

    AutoImport(merge({}, options?.autoImport)),

    viteCustomResolveGlobalType(options?.resolveGlobalType),

    process.env.NODE_ENV_SSL && SSL(options?.ssl),

    viteEnv.VITE_VISUALIZER === 'Y' &&
      visualizer({
        gzipSize: true,
        brotliSize: true,
        open: false,
      }),
  ] as PluginOption[]
}

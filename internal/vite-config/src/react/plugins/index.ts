import { type GetOptions } from '../../type'

import { merge } from 'lodash-es'
import { loadEnv, type PluginOption, type ConfigEnv } from 'vite'
import { convertNodeEnvToViteEnv } from '../../helper'

import React from '@vitejs/plugin-react'
import ReactSwc from '@vitejs/plugin-react-swc'

export type ReactPluginOptions = Partial<{
  react: GetOptions<typeof React>
  reactSwc: GetOptions<typeof ReactSwc>
}>

export function createReactPluginOptions(
  configEnv: ConfigEnv,
  options?: ReactPluginOptions
): PluginOption[] {
  const env = loadEnv(configEnv.mode, process.cwd())
  const viteEnv = convertNodeEnvToViteEnv(env)

  return [
    React(merge({} as ReactPluginOptions['react'], options?.react)),

    ReactSwc(merge({} as ReactPluginOptions['reactSwc'], options?.reactSwc)),
  ] as PluginOption[]
}

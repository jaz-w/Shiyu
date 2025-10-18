import { loadEnv, type ConfigEnv } from 'vite'

import { __APP_INFO__ } from './define'
import { createServerOptions } from './server'
import { createCommonPluginOptions, type CommonPluginOptions } from './plugins'
import { convertNodeEnvToViteEnv, convertViteEnvToViteDefineObject } from '../helper'
import { createBuildOptions, type CommonBuildOptions } from './build'

export type CommonConfigOptions = {
  plugins?: CommonPluginOptions
  build?: CommonBuildOptions
}

export const createCommonViteConfig = async (
  configEnv: ConfigEnv,
  configOptions: CommonConfigOptions
) => {
  const env = loadEnv(configEnv.mode, process.cwd())
  const viteEnv = convertNodeEnvToViteEnv(env)
  const viteEnvDefine = convertViteEnvToViteDefineObject(viteEnv)

  return {
    define: { __APP_INFO__, ...viteEnvDefine },
    server: await createServerOptions(configEnv),
    preview: await createServerOptions(configEnv),
    plugins: createCommonPluginOptions(configEnv, configOptions?.plugins),
    build: createBuildOptions(configOptions?.build),
  }
}

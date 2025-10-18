import { defineConfig, mergeConfig } from 'vite'

import { createCommonViteConfig, type CommonConfigOptions } from '../common'
import { createReactPluginOptions, type ReactPluginOptions } from './plugins'
import { merge } from 'lodash-es'

export type ReactConfigOptions = {
  plugins: CommonConfigOptions['plugins'] & ReactPluginOptions
}

export default async (configOptions?: ReactConfigOptions) => {
  return defineConfig(async configEnv => {
    return mergeConfig(
      // Common Vite Config
      await createCommonViteConfig(configEnv, {
        plugins: merge(
          {
            autoImport: {
              imports: ['react'],
            },
          } as CommonConfigOptions['plugins'],
          configOptions?.plugins
        ),
      }),

      // Custom Vite Config
      { plugins: createReactPluginOptions(configEnv, configOptions?.plugins) }
    )
  })
}

import { defineConfig, mergeConfig } from 'vite'

import { createCommonViteConfig, type CommonConfigOptions } from '../common'
import { createVuePluginOptions, type VuePluginOptions } from './plugins'
import { merge } from 'lodash-es'

export type VueConfigOptions = {
  plugins: CommonConfigOptions['plugins'] & VuePluginOptions
}

export default async (configOptions?: VueConfigOptions) => {
  return defineConfig(async configEnv => {
    return mergeConfig(
      // Common Vite Config
      await createCommonViteConfig(configEnv, {
        plugins: merge(
          {
            autoImport: {
              imports: [
                'vue',
                {
                  from: 'vue',
                  imports: [
                    'App',
                    'CSSProperties',
                    'DirectiveBinding',
                    'Directive',
                    'Ref',
                    'InjectionKey',
                    'ShallowRef',
                    'StyleValue',
                    'VNode',
                    'VNodeChild',
                  ],
                  type: true,
                },
              ],
            },
          } as CommonConfigOptions['plugins'],
          configOptions?.plugins
        ),
      }),

      // Custom Vite Config
      { plugins: createVuePluginOptions(configEnv, configOptions?.plugins) }
    )
  })
}

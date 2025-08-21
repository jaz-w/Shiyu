import { defineConfig, type PluginOption } from 'vite'

import legacy from '@vitejs/plugin-legacy'
import progress from 'vite-plugin-progress'
import checker from 'vite-plugin-checker'

import { type GetOptions } from './type'

export default ({
  legacyOptions,
  progressOptions,
  checkerOptions,
}: {
  legacyOptions?: GetOptions<typeof legacy>
  progressOptions?: GetOptions<typeof progress>
  checkerOptions?: GetOptions<typeof checker>
}) => {
  return defineConfig({
    plugins: [
      legacy(legacyOptions),

      progress(progressOptions),

      checker(checkerOptions ?? { vueTsc: true }),
    ] as PluginOption[],
  })
}

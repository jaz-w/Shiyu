import type { PluginOption } from 'vite'

import type { GetOptions } from './type'

import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import progress from 'vite-plugin-progress'

export default ({
  legacyOptions,
  progressOptions,
  checkerOptions,
}: {
  checkerOptions?: GetOptions<typeof checker>
  legacyOptions?: GetOptions<typeof legacy>
  progressOptions?: GetOptions<typeof progress>
}) => {
  return defineConfig({
    plugins: [
      legacy(legacyOptions),

      progress(progressOptions),

      checker(checkerOptions ?? { vueTsc: true }),
    ] as PluginOption[],
  })
}

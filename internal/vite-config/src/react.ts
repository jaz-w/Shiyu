import { defineConfig, type PluginOption } from 'vite'

import react from '@vitejs/plugin-react'
import reactSwc from '@vitejs/plugin-react-swc'

import { type GetOptions } from './type'

export default ({
  reactOptions,
  reactSwcOptions,
}: {
  reactOptions?: GetOptions<typeof react>
  reactSwcOptions?: GetOptions<typeof reactSwc>
}) => {
  defineConfig({
    plugins: [react(reactOptions), reactSwc(reactSwcOptions)] as PluginOption[],
  })
}

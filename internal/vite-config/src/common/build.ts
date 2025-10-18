import { type BuildOptions } from 'vite'

export type CommonBuildOptions = Partial<{
  chunks: string[]
}>

export function createBuildOptions(options?: CommonBuildOptions): BuildOptions {
  const { chunks = [] } = options || {}

  return {
    target: 'es2015',
    cssTarget: 'chrome80',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          /** node_modules/.pnpm/lodash-es@x.x ... */
          if (id.includes('node_modules/.pnpm')) {
            if (chunks.some(chunk => id.includes(chunk))) {
              return id.split('node_modules/.pnpm/')[1]!.split('/')[0]!.split('@')[0]
            }

            return 'vendors'
          }
          // /** 如果有多语言 按语言文件分 */
          else if (id.includes('locales')) return id.split('locales/')[1]!.split('.')[0]
        },
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
      onwarn() {
        const usageTotal = Math.round(process.memoryUsage().heapUsed / (1024 * 1024))
        console.log(`Node 当前内存占用: ${usageTotal}MB`)
      },
    },
  }
}

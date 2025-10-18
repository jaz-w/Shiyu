declare type Maybe<T> = T | undefined | null

declare type MaybeArray<T> = T | T[]

declare type MaybeParital<T> = {
  [P in keyof T]?: Maybe<T[P]>
}

declare const __APP_INFO__: {
  // 站点标题
  name: string
  // 站点描述
  description: string
  // 版本号
  version: string
  // 构建时间
  release: number
}

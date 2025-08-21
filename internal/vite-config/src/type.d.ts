export type GetOptions<T extends (...args: any[]) => any> = Parameters<T>[0]

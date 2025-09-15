import { dirname } from 'node:path'
import { findUpSync } from 'find-up'
import {
  getPackages as getPackagesFunc,
  getPackagesSync as getPackagesSyncFunc,
} from '@manypkg/get-packages'

/**
 * 查找大仓的根目录
 * @param cwd
 */
export function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync('pnpm-lock.yaml', {
    cwd,
    type: 'file',
  })
  return dirname(lockFile || '')
}

/**
 * 获取大仓的所有包
 */
export function getPackagesSync() {
  const root = findMonorepoRoot()
  return getPackagesSyncFunc(root)
}

/**
 * 获取大仓的所有包
 */
export async function getPackages() {
  const root = findMonorepoRoot()

  return await getPackagesFunc(root)
}

/**
 * 获取大仓指定的包
 */
export async function getPackage(pkgName: string) {
  const { packages } = await getPackages()
  return packages.find(pkg => pkg.packageJson.name === pkgName)
}

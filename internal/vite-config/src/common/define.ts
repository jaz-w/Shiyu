import { readPackageJSON } from '@jaz-w/shiyu-node-utils'

const { name, version, description } = await readPackageJSON()

export const __APP_INFO__ = {
  name,
  version,
  description,
  release: Date.now(),
}

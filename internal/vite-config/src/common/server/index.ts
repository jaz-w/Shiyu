import { loadEnv, type CommonServerOptions, type ConfigEnv } from 'vite'

import { fs } from '@jaz-w/shiyu-node-utils'
import { createProxy } from './proxy'
import { convertNodeEnvToViteEnv } from '../../helper'

export const createServerOptions = async (config: ConfigEnv): Promise<CommonServerOptions> => {
  const env = loadEnv(config.mode, process.cwd())
  const viteEnv = convertNodeEnvToViteEnv(env)

  const {
    VITE_PROXY_API,
    VITE_PROXY_API_URL,
    VITE_DEPLOY_WEBSITE,
    VITE_DEPLOY_PORT,
    VITE_SSL_CERTIFICATE,
    VITE_SSL_PRIVATE_KEY,
    VITE_SSL_CA_CERTIFICATE,
  } = viteEnv

  const httpsOptions: CommonServerOptions['https'] = {}

  let existCertificate = false

  if (VITE_SSL_CERTIFICATE && VITE_SSL_PRIVATE_KEY && VITE_SSL_CA_CERTIFICATE) {
    const [cert, ca, key] = await Promise.all([
      await fs.readFile(VITE_SSL_CERTIFICATE),
      await fs.readFile(VITE_SSL_CA_CERTIFICATE),
      await fs.readFile(VITE_SSL_PRIVATE_KEY),
    ])

    httpsOptions.cert = cert
    httpsOptions.ca = ca
    httpsOptions.key = key

    existCertificate = true
  }
  return {
    host: true,

    allowedHosts: VITE_DEPLOY_WEBSITE ? [new URL(VITE_DEPLOY_WEBSITE)?.hostname] : void 0,

    port: VITE_DEPLOY_PORT,

    proxy: VITE_PROXY_API === 'Y' ? createProxy(VITE_PROXY_API_URL) : void 0,

    https: existCertificate ? httpsOptions : void 0,
  }
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface ImportMetaEnv extends ViteEnv {}

declare interface ViteEnv {
  // ----------------- SEO -----------------
  // 站点标题
  readonly VITE_APP_TITLE: string
  // 站点描述
  readonly VITE_APP_DESCRIPTION: string
  // 站点关键词
  readonly VITE_APP_KEYWORDS: string
  // 站点审计 地址
  readonly VITE_APP_AUDIT_URL: string
  // 站点审计 ID
  readonly VITE_APP_AUDIT_ID: string

  // ----------------- Deploy -----------------
  // 站点的域名
  readonly VITE_DEPLOY_WEBSITE: string
  // 站点服务启动的端口
  readonly VITE_DEPLOY_PORT: number

  // ----------------- API -----------------
  // 基础
  readonly VITE_API_URL: string
  // 审计相关
  readonly VITE_API_AUDIT_URL: string
  // 本地开发阶段代理的服务的前缀 - 基础
  readonly VITE_PROXY_API_PREFIX: string
  // 本地开发阶段代理的服务的前缀 - 审计相关
  readonly VITE_PROXY_API_AUDIT_PREFIX: string
  // 本地开发阶段代理的服务,末尾别带逗号,支持读取`VITE_`环境变量,写法`$VITE_XXX`
  // 示例1:["/base","http://xxxx.com"]
  // 示例2:["/base","VITE_API_URL"]
  readonly VITE_PROXY_API_URL: [string, string][]

  // ----------------- Security And SSL  -----------------
  // 是否开启接口传输加密
  readonly VITE_REQUEST_SECURITY: 'Y' | 'N'
  // 是否开启接口响应解密
  readonly VITE_RESPONSE_SECURITY: 'Y' | 'N'
  // 受信任的域名
  readonly VITE_TRUST_HOSTNAMES?: string[]
  // 证书配置 - 证书文件路径
  readonly VITE_SSL_CERTIFICATE?: string
  // 私钥配置 - 私钥文件路径
  readonly VITE_SSL_PRIVATE_KEY?: string
  // CA证书配置 - CA证书文件路径
  readonly VITE_SSL_CA_CERTIFICATE?: string

  // ----------------- 本地开发 -----------------
  // 是否 在本地开发阶段代理服务请求
  readonly VITE_PROXY_API: 'Y' | 'N'
  // 是否开启MOCK - 优先级大于代理
  readonly VITE_MOCK: 'Y' | 'N'
  // 是否 开启打包结果分析
  readonly VITE_VISUALIZER: 'Y' | 'N'
}

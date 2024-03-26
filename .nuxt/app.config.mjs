
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/peetstander/Projects/omni-starter/app.config.ts"
import cfg1 from "/Users/peetstander/Projects/omni-starter/node_modules/.c12/github_PartnersInBiz_omni_PfeSC7yUFf/app.config.ts"
import cfg2 from "/Users/peetstander/Projects/omni-starter/node_modules/.pnpm/@shuriken-ui+nuxt@3.0.4_nuxt@3.11.1/node_modules/@shuriken-ui/nuxt/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, cfg1, cfg2, inlineConfig)

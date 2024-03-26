import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "dynamic" | "empty"
declare module "../../node_modules/.pnpm/nuxt@3.11.1_@unocss+reset@0.58.7_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.2_unocss@0.58.7_vue-tsc@2.0.6/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}
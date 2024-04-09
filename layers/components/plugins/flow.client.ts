import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import { defineNuxtPlugin } from '#app'
import { VueFlow, useVueFlow } from '@vue-flow/core'
// https://vue-map.netlify.app/
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.component('VueFlow', VueFlow)
  nuxtApp.vueApp.component('useVueFlow', useVueFlow)
})

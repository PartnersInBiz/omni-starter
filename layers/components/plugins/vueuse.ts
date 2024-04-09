import { defineNuxtPlugin } from '#app'
import { onClickOutside } from '@vueuse/core'
// https://vue-map.netlify.app/
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.component('onClickOutside', onClickOutside)
})

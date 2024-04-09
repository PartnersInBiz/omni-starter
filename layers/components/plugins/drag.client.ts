import { defineNuxtPlugin } from '#app'
import VueDragscroll from 'vue-dragscroll'
import draggable from 'vuedraggable'
// https://vue-map.netlify.app/
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(VueDragscroll)
  nuxtApp.vueApp.component('draggable', draggable)
})

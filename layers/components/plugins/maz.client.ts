import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import { defineNuxtPlugin } from '#app'
// https://vue-map.netlify.app/
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.component('MazPhoneNumberInput', MazPhoneNumberInput)
})

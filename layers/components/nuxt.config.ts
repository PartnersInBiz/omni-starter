import exposeColors from './tailwind/plugin-expose-colors'

export default defineNuxtConfig({
  extends: ['@shuriken-ui/nuxt'],
  modules: ['@cssninja/nuxt-toaster'],
  plugins: [],

  tailwindcss: {
    config: {
      content: [],
      plugins: [exposeColors],
    },
  },
  app: {
    pageTransition: {
      enterActiveClass: 'transition-opacity duration-200 ease-out',
      enterFromClass: 'opacity-0',
      enterToClass: 'opacity-100',
      leaveActiveClass: 'transition-opacity duration-75 ease-in',
      leaveFromClass: 'opacity-100',
      leaveToClass: 'opacity-0',
    },
  },
})

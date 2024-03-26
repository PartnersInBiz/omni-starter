export default defineNuxtConfig({
  extends: ["github:PartnersInBiz/omni-components"],

  /**
   * Load local font with @fontsource packages
   * @see https://fontsource.org/
   */
  css: [
    "@fontsource-variable/inter/index.css",
    "@fontsource-variable/karla/index.css",
  ],
})

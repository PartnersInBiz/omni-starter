export default defineNuxtConfig({
  extends: [
    "../layers/components",
    "../layers/layout-sidebar",
    "../layers/layout-collapse",
    "../layers/layout-topnav",
    "../layers/layout-dynamic",
  ],

  /**
   * Load local font with @fontsource packages
   * @see https://fontsource.org/
   */
  css: [
    "@fontsource-variable/inter/index.css",
    "@fontsource-variable/karla/index.css",
  ],
});

import {
  demoRules,
  documentationRules,
  landingRules,
  corsRules,
} from "./config/routes-rules";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Omni Software",
      htmlAttrs: {
        lang: "pl",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins",
        },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
        },
      ],
    },
  },
  runtimeConfig: {},
  extends: [
    "../layers/components",
    "../layers/layout-sidebar",
    "../layers/layout-collapse",
    "../layers/layout-topnav",
    "../layers/layout-dynamic",
    "../layers/tools/capacitor",
    "../layers/tools/sockets",
    "../layers/tools/tauri",
    "../layers/tools/twilio",
    "../layers/tools/games-html",
    "../layers/tools/firebase",
    "../layers/tools/weaviate",
  ],

  modules: ["@nuxtjs/tailwindcss"],
  css: [
    "@/assets/css/main.css",
    "~/assets/css/colors.css",
    "@fontsource-variable/fira-code/index.css",
    "@fontsource-variable/inter/index.css",
    "@fontsource-variable/karla/index.css",
  ],

  experimental: {
    // using chokidar-granular watcher run faster
    // when using layers and/or in large projects
    watcher: "chokidar-granular",
    // Write early hints when using node server.
    writeEarlyHints: true,
    // Render JSON payloads with support for revivifying complex types.
    renderJsonPayloads: true,
  },
  typescript: {
    tsConfig: {
      // Here you can customize the generated tsconfig.json file
    },
  },

  routeRules: {
    ...demoRules,
    ...landingRules,
    ...(process.env.ENABLE_DOCUMENTATION ? documentationRules : {}),
    ...corsRules,
  },

  // nuxt build configuration
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  build: {
    transpile: [],
  },
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
    define: {
      "process.test": false,
      // This is required for shiki to work (used to render markdown code blocks)
      "process.env.VSCODE_TEXTMATE_DEBUG": false,
      // This enables vue-axe to work (used to check a11y - see .demo/plugins/vue-axe.ts)
      "process.env.ENABLE_A11Y_AXE": process.env.ENABLE_A11Y_AXE,
    },
    // optimizeDeps: {
    //   include: [
    //     // "vue-google-maps-community-fork",
    //     // "fast-deep-equal",
    //   ],
    // },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
});

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
  runtimeConfig: {
    omniSalt: "omniSalt",
    buildType: "web",
    development: process.env.NODE_ENV !== "production",
    apiUrl:
      process.env.NODE_ENV !== "production"
        ? "https://localhost:3000"
        : "https://us-central1-omni-legion.cloudfunctions.net",
    mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,

    functionsUrl:
      process.env.NODE_ENV !== "production"
        ? "https://us-central1-omni-test-c7c58.cloudfunctions.net"
        : "https://us-central1-omni-legion.cloudfunctions.net",
    OPENAI: {
      org_id: "org-Crv0VWIHGavD436Ft4SHrDjT",
      secret: "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",
    },
    PALM: {
      apiKey:
        "959444659311-ehge6e6mjm30f5f00j096gh1lq2kf2m7.apps.googleusercontent.com",
    },
    CLAUDE: {
      apiKey:
        "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",
    },
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyA4Vw-Btc2MCDfOjFwdYyrAsfAaKBWguxA",
      authDomain: "omni-legion.firebaseapp.com",
      projectId: "omni-legion",
      storageBucket: "omni-legion.appspot.com",
      messagingSenderId: "959444659311",
      appId: "1:959444659311:web:596a5615434d22f1aef19a",
      measurementId: "G-SFNJD7YDWQ",
    },
    FIREBASE_CONFIG_TEST: {
      apiKey: "AIzaSyBz_VjZpef_5TOFOQ8MmmVIvYkM4C7NRPY",
      authDomain: "omni-test-c7c58.firebaseapp.com",
      projectId: "omni-test-c7c58",
      storageBucket: "omni-test-c7c58.appspot.com",
      messagingSenderId: "44384668554",
      appId: "1:44384668554:web:9343f59f3ef68c4e625673",
      measurementId: "G-Z3M3C4520C",
    },
    WEAVIATE: {
      scheme: "https",
      host: "https://qdmjele1q7yxfpayzqyjww.c1.us-east4.gcp.weaviate.cloud",
      apiKey: "c0td96UioBdSjHVFvdBoFW9UiYn4lgkPGs6C",
      type: "production",
    },
    WEAVIATE_TEST: {
      scheme: "https",
      host: "https://0bl469ibts2jvq9mnf6lug.c0.us-west4.gcp.weaviate.cloud",
      apiKey: "n4PrvWRvbT5fqUxwIra5kdqP9UpN5dCqw6Gg",
      type: "development",
    },
    public: {
      omniSalt: "omniSalt",

      apiUrl:
        process.env.NODE_ENV !== "production"
          ? "https://localhost:3000"
          : "https://us-central1-omni-legion.cloudfunctions.net",
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,

      buildType: "web",
      development: process.env.NODE_ENV !== "production",
      functionsUrl:
        process.env.NODE_ENV !== "production"
          ? "https://us-central1-omni-test-c7c58.cloudfunctions.net"
          : "https://us-central1-omni-legion.cloudfunctions.net",
      OPENAI: {
        org_id: "org-Crv0VWIHGavD436Ft4SHrDjT",
        secret: "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",
      },
      PALM: {
        apiKey:
          "959444659311-ehge6e6mjm30f5f00j096gh1lq2kf2m7.apps.googleusercontent.com",
      },
      CLAUDE: {
        apiKey:
          "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",
      },
      FIREBASE_CONFIG: {
        apiKey: "AIzaSyA4Vw-Btc2MCDfOjFwdYyrAsfAaKBWguxA",
        authDomain: "omni-legion.firebaseapp.com",
        projectId: "omni-legion",
        storageBucket: "omni-legion.appspot.com",
        messagingSenderId: "959444659311",
        appId: "1:959444659311:web:596a5615434d22f1aef19a",
        measurementId: "G-SFNJD7YDWQ",
      },
      FIREBASE_CONFIG_TEST: {
        apiKey: "AIzaSyBz_VjZpef_5TOFOQ8MmmVIvYkM4C7NRPY",
        authDomain: "omni-test-c7c58.firebaseapp.com",
        projectId: "omni-test-c7c58",
        storageBucket: "omni-test-c7c58.appspot.com",
        messagingSenderId: "44384668554",
        appId: "1:44384668554:web:9343f59f3ef68c4e625673",
        measurementId: "G-Z3M3C4520C",
      },
      WEAVIATE: {
        scheme: "https",
        host: "https://qdmjele1q7yxfpayzqyjww.c1.us-east4.gcp.weaviate.cloud",
        apiKey: "c0td96UioBdSjHVFvdBoFW9UiYn4lgkPGs6C",
        type: "production",
      },
      WEAVIATE_TEST: {
        scheme: "https",
        host: "https://0bl469ibts2jvq9mnf6lug.c0.us-west4.gcp.weaviate.cloud",
        apiKey: "n4PrvWRvbT5fqUxwIra5kdqP9UpN5dCqw6Gg",
        type: "development",
      },
    },
  },
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
  ssr: false,
});

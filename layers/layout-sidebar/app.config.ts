export default defineAppConfig({
  tairo: {
    sidebar: {
      circularMenu: {
        enabled: false,
        tools: [],
      },
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: false,
        tools: [],
      },
      navigation: {
        enabled: true,
        startOpen: true,
        logo: {
          component: 'Logo',
          props: { class: 'text-primary-600 h-10' },
        },
        items: [],
      },
    },
  },
})

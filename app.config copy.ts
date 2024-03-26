export default defineAppConfig({
  tairo: {
    title: "Omni",
    description: "Omni Software",
    logo: "/icons/light/logo.png",
    logoDark: "/icons/dark/logo.png",
    favicon: "/favicon.ico",
    uuid: "4299b97a-764b-5b26-a701-425e2ffda601",
    theme: "light",
    themeDark: "dark",
    themeColors: {
      primary: "#4F46E5",
      secondary: "#FFD600",
      tertiary: "#FF4C60",
      quaternary: "#FFD600",
      quinary: "#FF4C60",
      senary: "#FFD600",
      septenary: "#FF4C60",
      octonary: "#FFD600",
      nonary: "#FF4C60",
      denary: "#FFD600",
    },
    themeColor: "primary",
    themeColorDark: "primary",

    sidebar: {
      toolbar: {
        showNavBurger: true,
        tools: [
          {
            component: "TopnavWorkspaceDropdown",
          },
          {
            component: "ThemeToggle",
            props: {
              disableTransitions: true,
            },
          },
          {
            component: "ToolbarWeaviate",
          },
          {
            component: "ToolbarLanguage",
          },
          {
            component: "ToolbarNotifications",
          },
          {
            component: "ToolbarActivity",
          },
          {
            component: "ToolbarAccountMenu",
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "ThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: "CircularMenuLanguage",
          },
          {
            component: "CircularMenuNotifications",
          },
          {
            component: "CircularMenuActivity",
          },
        ],
      },
      navigation: {
        logo: {
          component: "Logo",
          props: {
            class: "text-primary-600 h-10",
            src: "/icons/light/logo.png",
            srcDark: "/icons/dark/logo.png",
            classes: "h-200 w-200",
            alt: "Omni",
          },
        },
        items: [
          {
            title: "Builders",
            icon: { name: "ph:sidebar-duotone", class: "w-5 h-5" },
            activePath: "/builders",
            subsidebar: { component: "SubsidebarBuilders" },
          },
          {
            title: "Agency",
            icon: { name: "game-icons:crested-helmet", class: "w-5 h-5" },
            to: "/agency/dashboard",
          },
          {
            title: "Publishing",
            icon: { name: "material-symbols:menu-book", class: "w-5 h-5" },
            to: "/publishing/dashboard",
          },
          {
            title: "Customize",
            icon: { name: "ph:drop-half-bottom-duotone", class: "w-5 h-5" },
            click: () => {
              const isOpen = useState("switcher-open", () => false)
              isOpen.value = true
            },
            position: "end",
          },
          {
            title: "Search",
            icon: { name: "ph:magnifying-glass-duotone", class: "w-5 h-5" },
            click: () => {
              const isOpen = useState("search-open", () => false)
              isOpen.value = true
            },
            position: "end",
          },
          {
            title: "Settings",
            icon: { name: "ph:gear-six-duotone", class: "w-5 h-5" },
            to: "/settings/main",
            position: "end",
          },
          {
            title: "My Account",
            component: "AccountMenu",
            position: "end",
          },
        ],
      },
    },
    collapse: {
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: true,
        tools: [
          {
            component: "ThemeToggle",
          },
          {
            component: "ToolbarLanguage",
          },
          {
            component: "ToolbarNotifications",
          },
          {
            component: "ToolbarActivity",
          },
          {
            component: "ToolbarAccountMenu",
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "ThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: "CircularMenuLanguage",
          },
          {
            component: "CircularMenuNotifications",
          },
          {
            component: "CircularMenuActivity",
          },
        ],
      },
      navigation: {
        enabled: true,
        header: {
          component: "CollapseNavigationHeader",
        },
        footer: {
          component: "CollapseNavigationFooter",
        },
        items: [
          {
            name: "Messaging",
            icon: { name: "ph:chats-circle-duotone", class: "w-5 h-5" },
            to: "/",
          },
          {
            name: "Customize",
            icon: { name: "ph:drop-half-bottom-duotone", class: "w-5 h-5" },
            click: () => {
              const isSwitcherOpen = useState("switcher-open", () => false)
              isSwitcherOpen.value = true
            },
            position: "end",
          },
        ],
      },
    },
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: "Logo",
          props: {
            class: "text-primary-600 h-10 w-10",
            src: "/icons/light/logo.png",
            srcDark: "/icons/dark/logo.png",
            classes: "h-10 w-10",
            alt: "Omni",
          },
        },
        header: {
          component: "TopnavWorkspaceDropdown",
        },
        items: [],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "ThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: "CircularMenuLanguage",
          },
          {
            component: "CircularMenuNotifications",
          },
          {
            component: "CircularMenuActivity",
          },
        ],
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: "ThemeToggle",
            props: {
              disableTransitions: true,
            },
          },
          {
            component: "ToolbarWeaviate",
          },
          {
            component: "ToolbarSearch",
          },
          {
            component: "ToolbarCustomize",
          },
          {
            component: "ToolbarNotifications",
          },
          {
            component: "AccountMenu",
            props: {
              horizontal: true,
            },
          },
        ],
      },
      footer: {
        enabled: true,
        logoSeparator: {
          component: "Logo",
          props: { class: "text-primary-500 h-7 w-7" },
        },
        logo: {
          component: "LogoText",
          props: {
            class:
              "text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0",
          },
        },
        copyright: {
          name: "Omni",
          to: "https://omni-biz.com",
          since: "2018",
        },
        links: [
          {
            name: " pages",
            to: "/",
          },
          {
            name: "Documentation",
            to: "/",
          },
          {
            name: "Shuriken UI",
            to: "https://github.com/shuriken-ui",
            rel: "noopener",
            target: "_blank",
          },
          {
            name: "Support",
            to: "https://cssninja.io/faq/support",
            rel: "noopener",
            target: "_blank",
          },
        ],
      },
    },
    panels: [
      {
        name: "language",
        position: "right",
        component: "PanelsLanguage",
      },
      {
        name: "activity",
        position: "right",
        component: "PanelsActivity",
      },
      {
        name: "search",
        position: "left",
        component: "PanelsSearch",
      },
      {
        name: "task",
        position: "right",
        component: "PanelsTask",
      },
    ],
    error: {
      logo: {
        component: "img",
        props: {
          src: "/img/illustrations/system/404-1.svg",
          class: "relative z-20 w-full max-w-lg mx-auto",
        },
      },
    },
  },
  toaster: {
    duration: 6000,
    dismissible: false,
    theme: {
      maxToasts: 1,
      containerClass: [
        "fixed",
        "inset-0",
        "pointer-events-none",
        "p-4",
        "flex",
        "flex-col-reverse",
        "overflow-hidden",
        "z-[200]",
        "items-center",
        "gap-2",
        "space-y-3",
      ],
      wrapperClass: [
        "pointer-events-auto",
        "focus:outline-none",
        "rounded",
        "outline-slate-300",
        "outline-offset-2",
        "focus:outline",
        "focus:outline-2",
        "focus-within:outline",
        "focus-within:outline-2",
      ],
      transition: {
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "transform translate-y-full opacity-0",
        enterToClass: "transform translate-y-0 opacity-100",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "transform translate-y-0 opacity-100",
        leaveToClass: "transform translate-y-full opacity-0",
      },
    },
  },
})

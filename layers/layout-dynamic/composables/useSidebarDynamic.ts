export function useSidebarDynamic() {
  const dynamicNav = useState('dynamicNav', () => {
    return {
      tairo: {
        title: 'Omni',
        sidebar: {
          toolbar: {
            showNavBurger: true,
            tools: [
              {
                component: 'TopnavWorkspaceDropdown',
              },
              {
                component: 'ThemeToggle',
                props: {
                  disableTransitions: true,
                },
              },
              {
                component: 'ToolbarWeaviate',
              },
              {
                component: 'ToolbarLanguage',
              },
              {
                component: 'ToolbarNotifications',
              },
              {
                component: 'ToolbarActivity',
              },
              {
                component: 'ToolbarAccountMenu',
              },
            ],
          },
          circularMenu: {
            enabled: true,
            tools: [
              {
                component: 'ThemeToggle',
                props: {
                  class: 'ms-auto',
                  disableTransitions: true,
                  inverted: true,
                },
              },
              {
                component: 'CircularMenuLanguage',
              },
              {
                component: 'CircularMenuNotifications',
              },
              {
                component: 'CircularMenuActivity',
              },
            ],
          },
          navigation: {
            enabled: true,
            startOpen: false,
            logo: {
              component: 'Logo',
              props: {
                class: 'text-primary-600 h-10',
                src: '/icons/light/logo.png',
                srcDark: '/icons/dark/logo.png',
                classes: 'h-200 w-200',
                alt: 'Omni',
              },
            },
            items: [
              {
                title: 'TEST',
                icon: { name: 'ph:sidebar-duotone', class: 'w-5 h-5' },
                activePath: '/builders',
                subsidebar: { component: 'SubsidebarBuilders' },
              },
              {
                title: 'West',
                icon: { name: 'game-icons:crested-helmet', class: 'w-5 h-5' },
                to: '/agency/dashboard',
              },
              {
                title: 'Publishing',
                icon: { name: 'material-symbols:menu-book', class: 'w-5 h-5' },
                to: '/publishing/dashboard',
              },
              {
                title: 'Customize',
                icon: { name: 'ph:drop-half-bottom-duotone', class: 'w-5 h-5' },
                click: () => {
                  const isOpen = useState('switcher-open', () => false)
                  isOpen.value = true
                },
                position: 'end',
              },
              {
                title: 'Search',
                icon: { name: 'ph:magnifying-glass-duotone', class: 'w-5 h-5' },
                click: () => {
                  const isOpen = useState('search-open', () => false)
                  isOpen.value = true
                },
                position: 'end',
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
                component: 'ThemeToggle',
              },
              {
                component: 'ToolbarLanguage',
              },
              {
                component: 'ToolbarNotifications',
              },
              {
                component: 'ToolbarActivity',
              },
              {
                component: 'ToolbarAccountMenu',
              },
            ],
          },
          circularMenu: {
            enabled: true,
            tools: [
              {
                component: 'ThemeToggle',
                props: {
                  class: 'ms-auto',
                  disableTransitions: true,
                  inverted: true,
                },
              },
              {
                component: 'CircularMenuLanguage',
              },
              {
                component: 'CircularMenuNotifications',
              },
              {
                component: 'CircularMenuActivity',
              },
            ],
          },
          navigation: {
            enabled: true,
            startOpen: false,
            header: {
              component: 'CollapseNavigationHeader',
            },
            footer: {
              component: 'CollapseNavigationFooter',
            },
            items: [
              // {
              //   name: "Messaging",
              //   icon: { name: "ph:chats-circle-duotone", class: "w-5 h-5" },
              //   to: "/",
              // },
              // {
              //   name: "Customize",
              //   icon: { name: "ph:drop-half-bottom-duotone", class: "w-5 h-5" },
              //   click: () => {
              //     const isSwitcherOpen = useState("switcher-open", () => false)
              //     isSwitcherOpen.value = true
              //   },
              //   position: "end",
              // },
            ],
          },
        },
        topnav: {
          navigation: {
            enabled: true,
            logo: {
              component: 'Logo',
              props: {
                class: 'text-primary-600 h-10 w-10',
                src: '/icons/light/logo.png',
                srcDark: '/icons/dark/logo.png',
                classes: 'h-10 w-10',
                alt: 'Omni',
              },
            },
            header: {
              component: 'TopnavWorkspaceDropdown',
            },
            items: [],
          },
          circularMenu: {
            enabled: true,
            tools: [
              {
                component: 'ThemeToggle',
                props: {
                  class: 'ms-auto',
                  disableTransitions: true,
                  inverted: true,
                },
              },
              {
                component: 'CircularMenuLanguage',
              },
              {
                component: 'CircularMenuNotifications',
              },
              {
                component: 'CircularMenuActivity',
              },
            ],
          },
          toolbar: {
            enabled: true,
            showTitle: false,
            tools: [
              {
                component: 'ThemeToggle',
                props: {
                  disableTransitions: true,
                },
              },
              {
                component: 'ToolbarWeaviate',
              },
              {
                component: 'ToolbarSearch',
              },
              {
                component: 'ToolbarCustomize',
              },
              {
                component: 'ToolbarNotifications',
              },
              {
                component: 'AccountMenu',
                props: {
                  horizontal: true,
                },
              },
            ],
          },
          footer: {
            enabled: true,
            logoSeparator: {
              component: 'Logo',
              props: { class: 'text-primary-500 h-7 w-7' },
            },
            logo: {
              component: 'LogoText',
              props: {
                class:
                  'text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0',
              },
            },
            copyright: {
              name: 'Omni',
              to: 'https://omni-biz.com',
              since: '2018',
            },
            links: [
              {
                name: ' pages',
                to: '/',
              },
              {
                name: 'Documentation',
                to: '/',
              },
              {
                name: 'Shuriken UI',
                to: 'https://github.com/shuriken-ui',
                rel: 'noopener',
                target: '_blank',
              },
              {
                name: 'Support',
                to: 'https://cssninja.io/faq/support',
                rel: 'noopener',
                target: '_blank',
              },
            ],
          },
        },
        panels: [
          {
            name: 'language',
            position: 'right',
            component: 'PanelsLanguage',
          },
          {
            name: 'activity',
            position: 'right',
            component: 'PanelsActivity',
          },
          {
            name: 'search',
            position: 'left',
            component: 'PanelsSearch',
          },
          {
            name: 'task',
            position: 'right',
            component: 'PanelsTask',
          },
        ],
        error: {
          logo: {
            component: 'img',
            props: {
              src: '/img/illustrations/system/404-1.svg',
              class: 'relative z-20 w-full max-w-lg mx-auto',
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
            'fixed',
            'inset-0',
            'pointer-events-none',
            'p-4',
            'flex',
            'flex-col-reverse',
            'overflow-hidden',
            'z-[200]',
            'items-center',
            'gap-2',
            'space-y-3',
          ],
          wrapperClass: [
            'pointer-events-auto',
            'focus:outline-none',
            'rounded',
            'outline-slate-300',
            'outline-offset-2',
            'focus:outline',
            'focus:outline-2',
            'focus-within:outline',
            'focus-within:outline-2',
          ],
          transition: {
            enterActiveClass: 'transition duration-300 ease-out',
            enterFromClass: 'transform translate-y-full opacity-0',
            enterToClass: 'transform translate-y-0 opacity-100',
            leaveActiveClass: 'transition duration-200 ease-in',
            leaveFromClass: 'transform translate-y-0 opacity-100',
            leaveToClass: 'transform translate-y-full opacity-0',
          },
        },
      },
    }
  })

  const route = useRoute()

  const sidebars = computed(() => {
    if (
      dynamicNav.value.tairo.sidebar?.navigation?.enabled === false ||
      dynamicNav.value.tairo.sidebar?.navigation?.items?.length === 0
    ) {
      return []
    }
    return dynamicNav.value.tairo.sidebar?.navigation?.items
  })

  const currentName = useState('sidebar-name', () => '')
  const isOpen = useState<boolean | undefined>('sidebar-open', () => undefined)

  const hasSubsidebar = computed(() => {
    return sidebars.value?.some((sidebar) => sidebar.subsidebar?.component)
  })

  const current = computed(() => {
    if (!currentName.value) {
      return undefined
    }
    return sidebars.value?.find(({ title }) => title === currentName.value)
  })

  function toggle() {
    // If no sidebar item is selected, open the first one
    if (!currentName.value && !isOpen.value) {
      if (!sidebars.value?.[0]?.title) {
        // No sidebar items defined
        return
      }

      // Select the first sidebar item by default
      currentName.value = sidebars.value[0].title
    }

    isOpen.value = !isOpen.value
  }

  function close(unselect = false) {
    isOpen.value = false
    if (unselect) {
      currentName.value = ''
    }
  }

  function open(name: string) {
    currentName.value = name
    isOpen.value = true
  }

  function detect() {
    if (!dynamicNav.value.tairo.sidebar?.navigation?.startOpen) {
      isOpen.value = false
      return
    }

    const item = sidebars.value?.find(
      (bar) => bar?.activePath && route.fullPath.startsWith(bar.activePath),
    )
    if (item) {
      currentName.value = item.title
      if (!process.client) {
        isOpen.value = Boolean(currentName.value)
      } else {
        const isXl = useTailwindBreakpoints().xl.value
        isOpen.value = Boolean(currentName.value) && isXl
      }
    }
    return
  }

  function setup() {
    // Detect sidebar item on server page load
    if (!process.client) {
      detect()
      return
    }

    // Detect sidebar item on client page change
    // page:finish allow to wait for the page to be fully loaded before detecting the sidebar item
    const nuxtApp = useNuxtApp()
    const removeHook = nuxtApp.hook('page:finish', (e) => {
      detect()
      removeHook()
      return
    })

    // register a watcher to close sidebar when screen become extra large
    const { xl } = useTailwindBreakpoints()
    // close sidebar when screen become extra large
    watch(xl, (isXl) => {
      if (!isXl) {
        isOpen.value = false
      }
    })

    // register a watcher to open sidebar when a sidebar item is selected
    watch(
      () => currentName,
      (value) => {
        if (value) {
          // only open sidebar if it's not already open
          // and the screen is not extra cllarge
          if (xl.value) {
            isOpen.value = true
          }
        } else {
          isOpen.value = false
        }
      },
    )
  }

  return {
    sidebars,
    hasSubsidebar,
    current,
    currentName,
    isOpen,
    toggle,
    close,
    open,
    detect,
    setup,
    dynamicNav,
  }
}

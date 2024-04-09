<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    sidebar?: boolean;
    subsidebar?: boolean;
    toolbar?: boolean;
    circularMenu?: boolean;
    condensed?: boolean;
    horizontalScroll?: boolean;
  }>(),
  {
    sidebar: true,
    subsidebar: true,
    toolbar: true,
    circularMenu: true,
  }
);

const { dynamicNav } = useSidebarDynamic();
const { setup, currentName, isOpen, toggle } = useSidebar();
setup();

onUnmounted(() => {
  currentName.value = "";
  isOpen.value = undefined;
});

const sidebarEnabled = computed(() => {
  return (
    dynamicNav.value.tairo.sidebar?.navigation?.enabled !== false &&
    props.sidebar !== false
  );
});
const toolbarEnabled = computed(() => {
  return (
    dynamicNav.value.tairo.sidebar?.toolbar?.enabled !== false &&
    props.toolbar !== false
  );
});
const circularMenuEnabled = computed(() => {
  return (
    dynamicNav.value.tairo.sidebar?.circularMenu?.enabled !== false &&
    props.circularMenu !== false
  );
});

const wrapperClass = computed(() => {
  if (props.condensed) {
    return "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden";
  }

  if (!sidebarEnabled.value) {
    return "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10";
  }

  const list = [
    "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10",
  ];

  if (isOpen.value) {
    list.push("xl:max-w-[calc(100%_-_300px)] xl:ms-[300px]");
  } else {
    list.push("xl:max-w-[calc(100%_-_80px)] xl:ms-[80px]");
  }

  if (props.horizontalScroll) {
    list.push("!pe-0 xl:!pe-0");
  }

  return list;
});
</script>

<template>
  <div class="pb-20 bg-muted-100 dark:bg-muted-900">
    <slot name="sidebar">
      <DynamicNavigation v-if="sidebarEnabled" :subsidebar="props.subsidebar">
        <div
          v-if="dynamicNav.tairo.sidebar?.navigation?.logo?.component"
          class="flex items-center justify-center w-full h-16"
        >
          <slot name="logo">
            <NuxtLink to="/" class="flex items-center justify-center">
              <component
                :is="
                  resolveComponentOrNative(
                    dynamicNav.tairo.sidebar?.navigation.logo.component
                  )
                "
                v-bind="dynamicNav.tairo.sidebar?.navigation.logo.props"
              ></component>
            </NuxtLink>
          </slot>
        </div>
      </DynamicNavigation>
      <div
        role="button"
        class="bg-muted-800 dark:bg-muted-900 fixed start-0 top-0 z-[59] block h-full w-full transition-opacity duration-300 lg:hidden"
        :class="
          isOpen
            ? 'opacity-50 dark:opacity-75'
            : 'opacity-0 pointer-events-none'
        "
        @click="toggle"
      ></div>
    </slot>

    <div :class="wrapperClass">
      <div
        :class="[
          props.condensed && !props.horizontalScroll && 'w-full',
          !props.condensed && props.horizontalScroll && 'mx-auto w-full',
          !props.condensed &&
            !props.horizontalScroll &&
            'mx-auto w-full max-w-7xl',
        ]"
      >
        <slot name="toolbar">
          <DynamicToolbar
            v-if="toolbarEnabled"
            :sidebar="props.sidebar"
            :horizontal-scroll="props.horizontalScroll"
          >
            <template #title><slot name="toolbar-title"></slot></template>
          </DynamicToolbar>
        </slot>

        <main>
          <slot />
        </main>
      </div>
    </div>

    <Panels />
    <DynamicCircularMenu v-if="circularMenuEnabled" />
  </div>
</template>

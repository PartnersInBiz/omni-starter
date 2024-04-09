<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    links: {
      name: string;
      icon: string;
      url: string;
      color: string;
    }[];
  }>(),
  {
    links: [],
  }
);
</script>

<template>
  <div class="flex w-full items-center justify-between gap-3">
    <NuxtLink
      v-for="link in links"
      :key="link.name"
      :to="link.url"
      class="text-muted-400 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:text-white hover:shadow-xl"
      :class="[
        link.name === 'facebook' &&
          'hover:bg-indigo-800 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-800/30',
        link.name === 'twitter' &&
          'hover:bg-sky-500 hover:shadow-sky-500/30 dark:hover:shadow-sky-800/30',
        link.name === 'linkedin' &&
          'hover:bg-indigo-800 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-800/30',
        link.name === 'github' &&
          'hover:bg-muted-900 dark:hover:bg-muted-700 hover:shadow-muted-500/30 dark:hover:shadow-muted-800/30',
      ]"
    >
      <Icon :name="link.icon" class="h-4 w-4" />
    </NuxtLink>
  </div>
</template>

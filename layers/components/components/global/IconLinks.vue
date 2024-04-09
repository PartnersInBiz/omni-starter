<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    links: {
      name: string;
      icon: string;
      url: string;
      color: string;
    }[];
    shape?: "straight" | "rounded" | "curved";
  }>(),
  {
    shape: "rounded",
  }
);
</script>

<template>
  <div class="flex items-center justify-between w-full gap-3">
    <NuxtLink
      v-for="link in links"
      :key="link.name"
      :to="link.url"
      class="flex items-center justify-center transition-all duration-300 rounded-full text-muted-400 hover:bg-primary-500 hover:shadow-primary-500/30 dark:hover:shadow-primary-800/30 h-9 w-9 hover:text-white hover:shadow-xl"
    >
      <Icon :name="link.icon" class="w-4 h-4" />
    </NuxtLink>
  </div>
</template>

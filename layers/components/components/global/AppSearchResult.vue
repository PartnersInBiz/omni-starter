<script setup lang="ts">
const props = defineProps<{
  to?: any;
  title?: string;
  subtitle?: string;
  icon?: string;
  search?: string;
}>();
const markedTitle = useNinjaMark(
  () => props.title,
  () => props.search,
  "nui-text-800 group-focus:text-primary-500 underline decoration-muted-500/40 group-focus:decoration-primary-500/40 group-hover:decoration-primary-500/40 group-hover:text-primary-500 dark:group-focus:text-primary-400 dark:group-hover:text-primary-400 bg-transparent"
);
const markedSubtitle = useNinjaMark(
  () => props.subtitle,
  () => props.search,
  "nui-text-500 bg-transparent underline decoration-muted-500/30"
);
</script>

<template>
  <NuxtLink
    class="flex items-center p-3 rounded nui-focus hover:bg-muted-50 focus:bg-muted-50 dark:hover:bg-muted-900 dark:focus:bg-muted-900 group"
    :to="props.to"
  >
    <div class="flex flex-col grow">
      <span
        v-if="props.title"
        class="text-sm nui-text-600 font-heading group-hover:text-primary-500 group-focus:text-primary-500 dark:group-hover:text-primary-400 dark:group-focus:text-primary-400"
        v-html="markedTitle"
      >
      </span>
      <span
        v-if="props.subtitle"
        class="text-sm nui-text-400 line-clamp-1"
        v-html="markedSubtitle"
      >
      </span>
    </div>
    <div v-if="props.icon" class="shrink-0">
      <img :src="props.icon" class="w-8 h-8" />
    </div>
  </NuxtLink>
</template>

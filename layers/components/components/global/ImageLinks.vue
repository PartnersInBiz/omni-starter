<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * The items to display in the component.
     */
    links: Array<{
      name: string;
      url: string;
      image: string;
    }>;
  }>(),
  {}
);
</script>

<template>
  <div class="flex w-full items-center justify-between gap-3">
    <NuxtLink
      v-for="link in links"
      :key="link.name"
      :to="link.url"
      class="group flex h-9 w-9 items-center justify-center transition-all duration-300"
    >
      <BaseAvatar
        :src="link.image"
        size="xs"
        class="opacity-60 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        :data-nui-tooltip="link.name"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const apps: any = useAppConfig();

/**
 * Global head configuration
 * @see https://unhead.harlanzw.com/
 * @see https://github.com/unjs/unhead/tree/main
 */
useHead({
  title: route.meta.title,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - ${apps.tairo.title}`
      : `${apps.tairo.title || "Omni"}`;
  },
});

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="rgb(var(--color-primary-500))" />

      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
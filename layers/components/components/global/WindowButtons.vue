<script setup lang="ts">
const { newWindow } = useTauri();
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex justify-around gap-6 pb-8 overflow-x-auto ltablet:overflow-visible lg:overflow-visible"
  >
    <!-- Item -->
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      @click="
        newWindow(item.url, item.title, item.width, item.height, item.resizable)
      "
      class="flex flex-col flex-1 text-center group"
    >
      <div
        :class="`nui-mask nui-mask-hexed bg-muted-200 dark:bg-muted-700 mx-auto flex h-16 w-16 scale-90 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-${item.color} dark:group-hover:bg-${item.color}`"
      >
        <div
          class="flex items-center justify-center w-16 h-16 scale-95 bg-white nui-mask nui-mask-hexed dark:bg-muted-800"
        >
          <Icon :name="item.icon" :class="`h-6 w-6 text-${item.color}`" />
        </div>
      </div>
      <BaseHeading
        as="h5"
        size="md"
        weight="medium"
        lead="tight"
        class="text-muted-400 dark:text-muted-400 group-hover:text-muted-600 dark:group-hover:text-muted-200"
      >
        <span class="font-sans text-sm">{{ item.title }}</span>
      </BaseHeading>
    </NuxtLink>
  </div>
</template>
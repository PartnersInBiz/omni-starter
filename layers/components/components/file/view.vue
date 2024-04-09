<script setup lang="ts">
defineProps({
  images: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<template>
  <div class="flex flex-wrap space-x-2">
    <div
      v-for="(image, index) in images"
      :key="index"
      @click="$emit('clicked', index)"
    >
      <document-type :doc="image" classes="h-24" />
    </div>
  </div>
</template>

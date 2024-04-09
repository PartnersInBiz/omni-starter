<script setup lang="ts">
const props: any = withDefaults(
  defineProps<{
    size?: string
    src?: string
    name?: string
  }>(),
  {
    size: 'xs',
    src: '',
    name: '',
  },
)
</script>

<template>
  <BaseAvatar :size="size" :text="name.charAt(0)" :src="src" />
</template>

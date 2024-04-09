<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved' | 'full'
    title: string
    class?: string
    labels: string[]
    item_id: string
    recentFiles: {
      id: number
      icon: string
      name: string
      type: string
    }[]
    savedFiles: {
      id: number
      icon: string
      name: string
      type: string
    }[]
  }>(),
  {
    shape: 'rounded',
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <FileListTabbed
      :shape="shape"
      :title="title"
      :labels="labels"
      :recent-files="recentFiles"
      :saved-files="savedFiles"
    />
  </BaseCard>
</template>

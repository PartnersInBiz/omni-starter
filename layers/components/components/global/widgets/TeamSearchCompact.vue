<script setup lang="ts">
const props = defineProps<{
  actions?: boolean
  item_id: string
  members: Array<{
    id: number
    first_name: string
    last_name: string
    image: string
    text: string
    role: string
  }>
  title: string
  buttonText: string
  shape: 'curved' | 'rounded' | 'square'
  class?: string
}>()


const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <TeamSearchCompact :shape="shape" :members="members" />
  </BaseCard>
</template>

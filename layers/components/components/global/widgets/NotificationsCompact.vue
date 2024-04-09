<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
    title: string
    item_id: string
    notifications: {
      title: string
      text: string
      time: string
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
    <NotificationsCompact :notifications="Notifications" :title="title" />
  </BaseCard>
</template>

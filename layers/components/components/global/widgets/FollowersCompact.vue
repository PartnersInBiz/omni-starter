<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'curved' | 'rounded' | 'square'
    class?: string
    title?: string
    subtitle?: string
    item_id: string
    text?: string
    followers: Array<{
      name: string
    }>
  }>(),
  {
    shape: 'rounded',
    class: '',
  },
)


const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <FollowersCompact :followers="followers" />
  </BaseCard>
</template>

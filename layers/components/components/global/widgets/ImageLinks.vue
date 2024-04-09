<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    links: {
      name: string
      url: string
      image: string
    }[]
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
    item_id: string
  }>(),
  {
    shape: 'rounded',
    class: 'p-4',
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <ImageLinks :shape="shape" :links="links" />
  </BaseCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text: string
    icon: string
    item_id: string
    indicator?: boolean
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
  }>(),
  {
    title: undefined,
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <IconText :title="title" :icon="icon" :text="text" :indicator="indicator" />
  </BaseCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    image: string
    value?: number
    item_id: string
    shape?: 'straight' | 'rounded' | 'curved'
  }>(),
  {
    value: 0,
    title: undefined,
    text: undefined,
    shape: 'rounded',
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <ProgressCircle :image="image" :title="title" :text="text" :value="value" />
  </BaseCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    icon?: string
    image: string
    value?: number
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
    item_id: string
  }>(),
  {
    value: 0,
    icon: undefined,
    title: undefined,
    text: undefined,
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
    <ProductCompact
      :image="image"
      :title="title"
      :text="text"
      :icon="icon"
      :shape="shape"
    />
  </BaseCard>
</template>

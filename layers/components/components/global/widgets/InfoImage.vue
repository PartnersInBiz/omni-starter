<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    image: string
    item_id: string
    imageDark?: string
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
  }>(),
  {
    title: undefined,
    text: undefined,
    imageDark: undefined,
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
    <InfoImage :shape="shape" :image="image" :title="title" :text="text" />
  </BaseCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    title?: string
    text?: string
    views?: string
    image?: string
    class: string
    item_id: string
  }>(),
  {
    shape: 'rounded',
    title: 'Video title',
    text: 'Video description',
    views: '0',
    image: '/img/widgets/video-compact.jpg',
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <VideoCompact
      :shape="shape"
      :title="title"
      :text="text"
      :views="views"
      :image="image"
    />
  </BaseCard>
</template>

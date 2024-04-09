<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    src?: string
    srcDark?: string
    alt?: string
    width: number
    height: number
    loading?: boolean
    class: string
    item_id: string
  }>(),
  {
    shape: 'rounded',
    src: undefined,
    srcDark: undefined,
    alt: undefined,
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <Picture
      :src="src"
      :alt="alt"
      :shape="shape"
      :height="height"
      :width="width"
      :loading="loading"
    />
  </BaseCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
    item_id: string
    links: {
      title: string
      icon: string
      url: string
    }[]
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
    <IconsSquare shape="curved" :links="links" />
  </BaseCard>
</template>

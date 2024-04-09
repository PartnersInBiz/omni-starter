<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    menu: {
      name: string
      url: string
      icon: string
    }[]
    class: string
    item_id: string
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
    <MenuIconList :shape="shape" :menu="menu" />
  </BaseCard>
</template>

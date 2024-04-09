<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
    item_id: string
    products: Array<{
      id: number
      name: string
      image: string
      price: number
      quantity: number
    }>
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
    <ShoppingCartCompact :shape="shape" :products="products" />
  </BaseCard>
</template>

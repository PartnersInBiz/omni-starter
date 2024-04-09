<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
    item_id: string
    days: {
      name: string
      date: number
      url: string
    }[]
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
    <DaysSquare :shape="shape" :days="days" />
  </BaseCard>
</template>

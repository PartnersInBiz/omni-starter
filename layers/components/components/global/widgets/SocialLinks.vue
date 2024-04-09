<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    links: {
      name: string
      icon: string
      url: string
      color: string
    }[]
    item_id: string
    shape?: 'straight' | 'rounded' | 'curved'
    class: string
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
    <SocialLinks :shape="shape" :links="links" />
  </BaseCard>
</template>

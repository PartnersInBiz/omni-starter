<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    tags?: any[]
    item_id: string
  }>(),
  {
    shape: 'rounded',
    tags: () => {
      return [
        {
          id: 1,
          name: 'Politics',
          highlight: false,
        },
        {
          id: 2,
          name: 'Economy',
          highlight: true,
        },
        {
          id: 3,
          name: 'Finance',
          highlight: false,
        },
        {
          id: 4,
          name: 'Environment',
          highlight: false,
        },
        {
          id: 5,
          name: 'Food',
          highlight: false,
        },
        {
          id: 6,
          name: 'Technology',
          highlight: true,
        },
      ]
    },
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <TagListCompact :tags="tags" :shape="shape" />
  </BaseCard>
</template>

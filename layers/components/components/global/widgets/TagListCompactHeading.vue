<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    tags?: any[]
    title: string
    item_id: string
    class: string
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
    <div class="mb-6 flex items-center justify-between">
      <BaseHeading
        as="h3"
        size="md"
        weight="semibold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <span>{{ title }}</span>
      </BaseHeading>
    </div>
    <TagListCompact :tags="tags" :shape="shape" />
  </BaseCard>
</template>

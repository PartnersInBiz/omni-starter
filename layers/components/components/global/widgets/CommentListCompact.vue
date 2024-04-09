<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved' | 'full'
    title: string
    class?: string
    buttonText: string
    item_id: string
    comments: {
      id: number
      first_name: string
      last_name: string
      image: string
      text: string
      content: string
    }[]
  }>(),
  {
    shape: 'rounded',
    class: 'p-6',
  },
)


const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <!-- Title -->
    <div class="flex items-center justify-between mb-8">
      <BaseHeading
        as="h3"
        size="md"
        weight="semibold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <span>{{ title }}</span>
      </BaseHeading>
      <NuxtLink
        to="#"
        class="px-4 py-2 font-sans text-sm font-medium transition-colors duration-300 rounded-lg bg-muted-100 hover:bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-900 text-primary-500 underline-offset-4 hover:underline"
      >
        {{ buttonText }}
      </NuxtLink>
    </div>
    <CommentListCompact :comments="comments" />
  </BaseCard>
</template>

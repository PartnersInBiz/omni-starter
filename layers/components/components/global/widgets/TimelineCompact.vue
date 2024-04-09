<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'rounded' | 'curved' | 'full'
    title: string
    class?: string
    item_id: string
    buttonText: string
    items?: {
      icon?: string
      image?: string
      title: string
      description: string
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
    <!-- Title -->
    <div class="mb-8 flex items-center justify-between">
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
        class="bg-muted-100 hover:bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-900 text-primary-500 rounded-lg px-4 py-2 font-sans text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline"
      >
        {{ buttonText }}
      </NuxtLink>
    </div>
    <TimelineCompact :shape="shape" :items="items" />
  </BaseCard>
</template>

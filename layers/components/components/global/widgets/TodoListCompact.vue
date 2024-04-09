<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    todos: {
      id: number
      title: string
      description: string
      completed: boolean
    }[]
    item_id: string
    tasks: string[]
    class: string
    title: string
    buttonText: string
    shape?: 'straight' | 'rounded' | 'curved' | 'full'
    color?:
      | 'success'
      | 'info'
      | 'warning'
      | 'danger'
      | 'primary'
      | 'lime'
      | 'sky'
  }>(),
  {
    color: 'success',
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
    <TodoListCompact color="sky" />
  </BaseCard>
</template>

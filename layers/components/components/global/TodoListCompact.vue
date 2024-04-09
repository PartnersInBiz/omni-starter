<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    todos: {
      id: number
      title: string
      description: string
      completed: boolean
    }[]
    tasks: string[]
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

const { todos, tasks } = toRefs(props)
</script>

<template>
  <div class="mb-2 space-y-6">
    <div v-for="task in todos" :key="task.id" class="flex items-center gap-3">
      <BaseCheckboxAnimated
        v-model="tasks"
        color="success"
        :value="`Option ${task.id}`"
      />
      <div>
        <BaseHeading
          as="h4"
          size="sm"
          weight="light"
          lead="tight"
          class="text-muted-800 dark:text-white"
        >
          <span>{{ task.title }}</span>
        </BaseHeading>
        <BaseParagraph size="xs">
          <span class="text-muted-400">
            {{ task.description }}
          </span>
        </BaseParagraph>
      </div>
    </div>
  </div>
</template>

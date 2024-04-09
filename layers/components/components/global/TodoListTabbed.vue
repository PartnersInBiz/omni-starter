<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved' | 'full'
    todos: {
      id: number
      title: string
      description: string
      completed: boolean
    }[]
    tasks: string[]
    labels: string[]
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
    shape: 'rounded',
    color: 'success',
  },
)
const { todos, tasks } = toRefs(props)
</script>

<template>
  <div>
    <TabbedContent title="Tasks" :labels="labels" :shape="props.shape">
      <template #tab-1>
        <div class="mb-2 space-y-6">
          <div
            v-for="task in todos"
            :key="task.id"
            class="flex items-center gap-3"
          >
            <BaseCheckboxAnimated
              v-model="tasks"
              :value="`Option ${task.id}`"
              color="success"
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
      <template #tab-2>
        <div class="mb-2 space-y-6">
          <div
            v-for="task in todos"
            :key="task.id"
            class="flex items-center gap-3"
          >
            <BaseCheckboxAnimated
              v-model="tasks"
              :value="`Option ${task.id}`"
              :classes="{
                label: [
                  props.color === 'success' && 'text-success-500',
                  props.color === 'info' && 'text-info-500',
                  props.color === 'warning' && 'text-warning-500',
                  props.color === 'danger' && 'text-danger-500',
                  props.color === 'primary' && 'text-primary-500',
                  props.color === 'lime' && 'text-lime-500',
                  props.color === 'sky' && 'text-sky-500',
                ].join(''),
              }"
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
    </TabbedContent>
  </div>
</template>

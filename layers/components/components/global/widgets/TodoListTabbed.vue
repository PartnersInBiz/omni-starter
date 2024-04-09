<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved' | 'full'
    tasks: string[]
    labels: string[]

    item_id: string
    todos: {
      id: number
      title: string
      description: string
      completed: boolean
    }[]
    class: string
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


const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <TodoListTabbed
      :shape="shape"
      :color="color"
      :tasks="tasks"
      :labels="labels"
      :todos="todos"
    />
  </BaseCard>
</template>

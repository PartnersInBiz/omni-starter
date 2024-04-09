<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?:
      | "success"
      | "info"
      | "warning"
      | "danger"
      | "primary"
      | "lime"
      | "sky";
    items: any[];
  }>(),
  {
    color: "success",
  }
);

const todos = [
  {
    id: 0,
    title: "Call Mr. Markstrom",
    description: "Review the project initial wireframes",
    completed: true,
  },
  {
    id: 1,
    title: "Finish wireframes",
    description: "Make all requested changes and publish",
    completed: false,
  },
  {
    id: 2,
    title: "Update timesheets",
    description: "Update all the team timesheets",
    completed: false,
  },
  {
    id: 3,
    title: "Request payout",
    description: "Send project invoice to client",
    completed: false,
  },
  {
    id: 4,
    title: "Approve components",
    description: "Review complete design system",
    completed: true,
  },
];

const tasks = ref<string[]>(["Option 0", "Option 1", "Option 2"]);
</script>

<template>
  <div class="mb-2 space-y-6">
    <div
      v-for="(task, index) in items"
      :key="index"
      class="flex items-center gap-3"
    >
      <div @click="$emit('select', index)">
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
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            class="inline-flex items-center justify-center h-6 px-3 font-sans text-xs font-medium rounded-full text-muted-500 dark:text-muted-400 bg-muted-200 dark:bg-muted-700/40"
            v-for="(tag, index) in task.tags"
            :key="index"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

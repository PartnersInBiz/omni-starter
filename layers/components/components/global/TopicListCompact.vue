<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "rounded" | "full";
    topics: Array<{
      id: number;
      title: string;
      icon: string;
      content: string;
    }>;
  }>(),
  {
    shape: "rounded",
  }
);
</script>

<template>
  <div class="mb-2 space-y-5">
    <div v-for="topic in topics" :key="topic.id" class="flex gap-3">
      <BaseIconBox :shape="props.shape" size="sm" :class="getRandomColor()">
        <Icon :name="topic.icon" class="h-5 w-5" />
      </BaseIconBox>
      <div>
        <BaseHeading
          as="h4"
          size="sm"
          weight="light"
          lead="tight"
          class="text-muted-800 dark:text-white"
        >
          <span>
            {{ topic.title }}
          </span>
        </BaseHeading>
        <BaseParagraph size="xs">
          <span class="text-muted-400">
            {{ topic.content }}
          </span>
        </BaseParagraph>
      </div>
    </div>
  </div>
</template>

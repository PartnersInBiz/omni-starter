<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    comments: {
      id: number;
      first_name: string;
      last_name: string;
      image: string;
      text: string;
      content: string;
    }[];
  }>(),
  {}
);
</script>

<template>
  <div class="mb-2 space-y-5">
    <div v-for="comment in comments" :key="comment.id" class="flex gap-3">
      <BaseAvatar
        :src="comment.image"
        :text="comment.text"
        size="xs"
        shape="straight"
        mask="blob"
        class="bg-primary-100 dark:bg-primary-500/20 text-primary-500 shrink-0"
      />
      <div>
        <BaseHeading
          as="h4"
          size="sm"
          weight="light"
          lead="tight"
          class="text-muted-800 dark:text-white"
        >
          <span>
            {{ comment.first_name }} {{ comment.last_name.slice(0, 1) }}.
          </span>
        </BaseHeading>
        <BaseParagraph size="xs">
          <span class="text-muted-400">
            {{ comment.content }}
          </span>
        </BaseParagraph>
      </div>
    </div>
  </div>
</template>

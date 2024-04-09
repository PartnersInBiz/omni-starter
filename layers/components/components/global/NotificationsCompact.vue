<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    notifications: {
      title: string;
      text: string;
      time: string;
    }[];
  }>(),
  {}
);
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <BaseHeading
        as="h3"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <span>{{ title }}</span>
      </BaseHeading>
    </div>
    <div>
      <ul class="space-y-3">
        <li v-for="(notification, index) in notifications" :key="index">
          <NuxtLink to="#" class="group flex items-center justify-between">
            <BaseParagraph size="sm">
              <span
                class="text-muted-500 dark:text-muted-400 group-hover:text-primary-500 transition-colors duration-300"
              >
                {{ notification.title }}
              </span>
            </BaseParagraph>
            <div
              class="bg-muted-200 dark:bg-muted-700 text-muted-500 dark:text-muted-200 flex h-7 w-7 items-center justify-center rounded-full text-xs"
            >
              <span>{{ notification.text }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

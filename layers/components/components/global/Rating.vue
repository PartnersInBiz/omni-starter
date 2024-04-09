<script setup lang="ts">
defineProps({
  currentRating: {
    type: Number,
    required: true,
  },
  currentRatingText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="flex items-end justify-between">
      <div class="w-24 text-xs uppercase leading-tight">Rating</div>
      <div class="text-success-600 font-sans text-xs font-semibold">
        {{ currentRatingText }}
      </div>
    </div>
    <div class="mt-1 flex">
      <div
        class="dark:border-muted-800 h-3 grow border-x border-white"
        :class="
          currentRating > 0
            ? 'bg-success-600'
            : 'bg-muted-200 dark:bg-muted-700'
        "
      ></div>
      <div
        class="dark:border-muted-800 h-3 grow border-x border-white"
        :class="
          currentRating >= 2
            ? 'bg-success-600'
            : 'bg-muted-200 dark:bg-muted-700'
        "
      ></div>
      <div
        class="dark:border-muted-800 h-3 grow border-x border-white"
        :class="
          currentRating >= 3
            ? 'bg-success-600'
            : 'bg-muted-200 dark:bg-muted-700'
        "
      ></div>
      <div
        class="dark:border-muted-800 h-3 grow border-x border-white"
        :class="
          currentRating >= 4
            ? 'bg-success-600'
            : 'bg-muted-200 dark:bg-muted-700'
        "
      ></div>
      <div
        class="dark:border-muted-800 h-3 grow border-x border-white"
        :class="
          currentRating === 5
            ? 'bg-success-600'
            : 'bg-muted-200 dark:bg-muted-700'
        "
      ></div>
    </div>
  </div>
</template>
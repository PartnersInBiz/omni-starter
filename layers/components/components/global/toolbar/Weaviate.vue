<script setup lang="ts">
const { user } = useAccount();
const test: any = process.env.NODE_ENV === "development";
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center transition-all duration-300 bg-white border rounded-full border-muted-200 hover:ring-muted-200 dark:hover:ring-muted-700 dark:border-muted-700 dark:bg-muted-800 dark:ring-offset-muted-900 h-9 w-9 ring-1 ring-transparent hover:ring-offset-4"
    @click="$router.push('/weaviate/dashboard')"
    v-if="user.email === 'standerpm@omni-biz.com' || test"
  >
    <Icon name="file-icons:dataweave" class="w-5 h-5 text-muted-400" />
  </button>
</template>

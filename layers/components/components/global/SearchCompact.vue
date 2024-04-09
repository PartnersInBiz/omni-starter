<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "straight" | "rounded" | "curved";
    tags?: string[];
  }>(),
  {
    shape: "rounded",
  }
);

const search = ref("");
const emit = defineEmits(["input", "select"]);
watch(
  () => search,
  (val) => {
    emit("input", val);
  }
);
</script>

<template>
  <div class="w-full">
    <div class="relative flex items-center w-full gap-2">
      <BaseInput
        v-model="search"
        icon="lucide:search"
        placeholder="Search"
        :shape="props.shape"
        :classes="{
          wrapper: 'w-full',
          input:
            'pe-24 !bg-muted-100 dark:!bg-muted-700 focus:!bg-white dark:focus:!bg-muted-900',
        }"
      />
      <button
        type="button"
        class="absolute inline-flex items-center justify-center h-8 px-4 font-sans text-sm text-white bg-primary-500 end-1 top-1"
        :class="[
          props.shape === 'rounded' ? 'rounded' : '',
          props.shape === 'curved' ? 'rounded-lg' : '',
        ]"
      >
        <span>Go</span>
      </button>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <span
        class="inline-flex items-center justify-center h-6 px-3 font-sans text-xs font-medium rounded-full text-muted-500 dark:text-muted-400 bg-muted-200 dark:bg-muted-700/40"
        v-for="(tag, index) in props.tags"
        :key="index"
        @click="$emit('select', tag)"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

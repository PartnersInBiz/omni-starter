<script setup lang="ts">
defineProps<{
  header: string;
  icon: string;
  img: string;
  title: string;
  subtitle: string;
  footer: string;
  bottom_text: string;
}>();
</script>

<template>
  <BaseCard class="p-6 cursor-pointer">
    <div class="flex items-center justify-between">
      <BaseParagraph size="md" class="text-muted-500 dark:text-muted-400">
        <span>{{ header }}</span>
      </BaseParagraph>
      <BaseIconBox size="md" class="text-pink-500 bg-pink-500/20" v-if="icon">
        <Icon :name="icon" class="w-6 h-6" />
      </BaseIconBox>
      <div class="shrink-0" v-if="img">
        <img
          :src="img"
          class="w-8 h-8 transition-transform duration-300 rounded-lg group-hover:scale-110"
        />
      </div>
    </div>
    <div class="pt-4 pb-6">
      <span
        class="font-sans text-4xl font-semibold leading-none text-muted-800 dark:text-muted-100"
      >
        {{ title }}
        <small class="text-sm font-medium text-muted-500 dark:text-muted-400">
          {{ subtitle }}
        </small>
      </span>
    </div>
    <div class="flex items-center gap-2 mb-2 font-sans">
      <div class="flex items-center font-semibold text-danger-500">
        <Icon name="lucide:arrow-down-right" class="w-4 h-4" />
        <span>{{ bottom_text }}</span>
      </div>
      <span class="text-sm text-muted-400">{{ footer }}</span>
    </div>
  </BaseCard>
</template>
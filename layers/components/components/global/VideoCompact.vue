<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "straight" | "rounded" | "curved";
    title?: string;
    text?: string;
    views?: string;
    image?: string;
  }>(),
  {
    shape: "rounded",
    title: "Video title",
    text: "Video description",
    views: "0",
    image: "/img/widgets/video-compact.jpg",
  }
);
</script>

<template>
  <NuxtLink to="#" class="flex w-full gap-4 group">
    <div class="relative shrink-0">
      <img
        class="object-cover object-top w-20 h-24"
        :src="image"
        :class="[
          props.shape === 'rounded' ? 'rounded' : '',
          props.shape === 'curved' ? 'rounded-lg' : '',
        ]"
        alt="Widget image"
      />
      <div class="absolute -translate-x-1/2 -translate-y-1/2 start-1/2 top-1/2">
        <button
          type="button"
          class="flex items-center justify-center w-10 h-10 transition-colors duration-300 border-2 rounded-full border-primary-500 bg-primary-500 dark:group-hover:bg-muted-800 group-hover:bg-white"
        >
          <Icon
            name="ic:round-play-arrow"
            class="w-5 h-5 text-white group-hover:text-primary-500"
          />
        </button>
      </div>
    </div>
    <div class="flex flex-col">
      <p class="my-1 font-sans text-xs uppercase text-primary-500">
        {{ title }}
      </p>
      <BaseHeading as="h3" size="sm" weight="medium" lead="tight">
        <span>{{ text }}</span>
      </BaseHeading>
      <div
        class="flex items-center gap-2 mt-auto font-sans text-xs text-muted-400"
      >
        <Icon name="lucide:eye" class="w-4 h-4" />
        <span>{{ views }} views</span>
      </div>
    </div>
  </NuxtLink>
</template>

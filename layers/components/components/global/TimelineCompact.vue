<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'rounded' | 'curved' | 'full'
    items: {
      icon?: string
      image?: string
      title: string
      description: string
    }[]
  }>(),
  {
    shape: 'rounded',
  },
)
</script>

<template>
  <div>
    <!-- Item -->
    <div
      v-for="item in items"
      :key="item.title"
      class="after:border-muted-300 dark:after:border-muted-600 relative flex pb-8 after:absolute after:start-4 after:top-10 after:h-[calc(100%_-_36px)] after:w-px after:border-l after:content-['']"
    >
      <div
        class="border-muted-200 text-muted-400 after:border-muted-300 dark:border-muted-600 dark:bg-muted-700 dark:after:border-muted-600 relative flex size-9 items-center justify-center border bg-white shadow-lg after:absolute after:-end-8 after:top-4 after:h-px after:w-5 after:border-t after:content-['']"
        :class="[
          props.shape === 'rounded' ? 'rounded-md' : '',
          props.shape === 'curved' ? 'rounded-xl' : '',
          props.shape === 'full' ? 'rounded-full' : '',
        ]"
      >
        <Icon v-if="item.icon" :name="item.icon" class="" />
        <img
          v-if="item.image"
          :src="item.image"
          class="object-cover max-w-full shadow-sm dark:border-transparent"
          :class="[
            props.shape === 'rounded' ? 'rounded-md' : '',
            props.shape === 'curved' ? 'rounded-xl' : '',
            props.shape === 'full' ? 'rounded-full' : '',
          ]"
          :alt="item.title"
        />
      </div>
      <div class="ms-10">
        <h6
          class="text-sm font-medium font-heading text-muted-800 dark:text-white"
        >
          {{ item.title }}
        </h6>
        <p class="font-sans text-xs text-muted-400">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

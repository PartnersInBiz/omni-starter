<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * The items to display in the component.
     */
    shape?: "curved" | "rounded" | "square";
    /**
     * The image to display in the component.
     */
    icon?: string;
    /**
     * The badge small to display in the component.
     */
    indicator?: boolean;
    /**
     * The title to display in the component.
     */
    title?: string;
    /**
     * The text to display in the component.
     */
    text?: string;

    class?: string;
    item_id: string
    tags: Array<{
      name: string;
    }>;
  }>(),
  {
    shape: "rounded",
    icon: "",
    indicator: true,
    title: "",
    text: "",
    class: "",
  }
);

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <IconText :title="title" :icon="icon" :text="text" :indicator="indicator">
      <div
        class="flex w-full gap-2 mt-3 font-sans text-xs font-medium text-primary-500"
      >
        <NuxtLink to="#" v-for="(tag, index) in tags" :key="index"
          >#{{ tag.name }}</NuxtLink
        >
      </div>
    </IconText>
  </BaseCard>
</template>
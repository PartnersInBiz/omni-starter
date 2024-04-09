<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string;
    class?: string;
  }>(),
  {
    icon: "lucide:circle",
    class: "h-4 w-4",
  }
);

const classes = computed(() => [props.class]);
</script>

<template>
  <client-only>
    <Icon :name="icon ? icon : 'mdi:home'" :class="classes" />
  </client-only>
</template>

<script setup lang="ts">
const { dynamicNav } = useSidebarDynamic();
</script>

<template>
  <div class="flex items-center gap-2">
    <template v-for="tool of dynamicNav.tairo.sidebar?.toolbar?.tools">
      <component
        :is="resolveComponentOrNative(tool.component)"
        v-if="tool.component"
        :key="tool.component"
        v-bind="tool.props"
      />
    </template>
  </div>
</template>

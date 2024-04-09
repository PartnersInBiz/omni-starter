<script setup lang='ts'>
const props = defineProps<{
  value: any;
  index: string;
}>();

let em: any = getCurrentInstance();
const clickHandler = () => {
  em.emit("selection", { index: props.index });
};
</script>

<template>
  <button class="square" @click="clickHandler">{{ value }}</button>
</template>


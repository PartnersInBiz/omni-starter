<script setup lang="ts">
const url = ref("ws://kiosk.local:8080/");

const showThird = ref(true);
</script>
<template>
  <div>
    <socket-test />
    <socket-test url="ws://kiosk.local:8080/kiosk" />
    <socket-test :url="url" v-if="showThird" />

    <button @click="showThird = !showThird">Toggle third</button>
    <input v-model="url" />
  </div>
</template>
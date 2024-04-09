<script setup lang="ts">
import WSClient from "../../utils/WSClient";

onMounted(() => {
  console.log("mounted");
  let client = WSClient.getInstance();
  console.log("client", client);
});
</script>

<template>
  <div>
    <h1>Test</h1>
  </div>
</template>
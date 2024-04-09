<script setup lang='ts'>
const { testChain } = useLegions();
</script>

<template>
  <div>
    <h1>Langchain Dashboard</h1>
    <button @click="testChain">Test Chain</button>
    <legions-agency-messaging />
  </div>
</template> 
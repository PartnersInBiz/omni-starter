<script setup lang="ts">
import { useWebSocket } from "@vueuse/core";
const props = withDefaults(
  defineProps<{
    url?: any;
    bodyAttrs?: string;
  }>(),
  {
    url: "wss://echo.websocket.org",
    bodyAttrs:
      "bg-muted-100 dark:bg-muted-100 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10",
  }
);

const { status, data, send, open, close } = useWebSocket(props.url, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert("Failed to connect WebSocket after 3 retries");
    },
  },
});
</script>

<template>
  <div>
    <div>Socket URL: {{ url }}</div>
    <div>Socket Status: {{ status }}</div>
    <div>Socket Data: {{ data }}</div>
    <div class="flex space-x-2">
      <button @click="send('Hello')">Send</button>
      <button @click="open">Open</button>
      <button @click="close">Close</button>
    </div>
  </div>
</template>
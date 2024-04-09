  
<script setup lang="ts">
import { getName, getTauriVersion, getVersion } from "@tauri-apps/api/app";

const appName = await getName();
const tauriVersion = await getTauriVersion();
const appVersion = await getVersion();
</script>
<template>
  <div class="container flex flex-col items-center mx-auto text-gray-300">
    <div class="my-12">
      <p>About project:</p>
      <table class="mt-3 border-collapse border-spacing-0">
        <tbody>
          <tr>
            <td class="px-2 py-1 border">app name</td>
            <td class="px-2 py-1 border">{{ appName }}</td>
          </tr>
          <tr>
            <td class="px-2 py-1 border">tauri version</td>
            <td class="px-2 py-1 border">{{ tauriVersion }}</td>
          </tr>
          <tr>
            <td class="px-2 py-1 border">app version</td>
            <td class="px-2 py-1 border">{{ appVersion }}</td>
          </tr>
          <tr>
            <td class="px-2 py-1 border">Nuxt version</td>
            <td class="px-2 py-1 border">3.1.2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

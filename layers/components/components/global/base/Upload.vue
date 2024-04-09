<script setup lang="ts">
const inputsUploadsProps = defineProps({
  schema: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const imgUpload: any = ref([]);
onMounted(() => {
  if (inputsUploadsProps.schema.value) {
    // img.value = inputsUploadProps.value;
  }
});
const currentInstanceUploadProps: any = getCurrentInstance();

function emitChanges(data: any[]) {
  imgUpload.value = data;
  currentInstanceUploadProps.emit("input", data);
}
const showAddItems = ref(false);
</script>

<template>
  <div class="w-full">
    <label :class="schema.class_label">
      {{ schema.label }}
    </label>
    <file-button @input="emitChanges" @close="showAddItems = false" />
    <div class="flex flex-wrap">
      {{ imgUpload }}
      <div v-for="(img, ind) in imgUpload" :key="ind" class="relative mt-2">
        <div
          class="mr-2 mt-2 flex h-32 content-center items-center justify-center overflow-hidden rounded"
        >
          <file-type :doc="img" classes="w-48 min-h-32" />
        </div>
      </div>
    </div>
  </div>
</template>

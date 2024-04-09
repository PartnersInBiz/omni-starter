<script setup lang="ts">
const showFileManager = ref(false)
const emitFile: any = getCurrentInstance()

const uploadAdd = (data: any) => {
  emitFile.emit('uploadAdd', data)
  showFileManager.value = false
}
</script>

<template>
  <div>
    <button
      type="button"
      class="border-muted-200 dark:border-muted-700 hover:ring-muted-200 dark:hover:ring-muted-700 dark:bg-muted-800 dark:ring-offset-muted-900 flex h-9 w-9 items-center justify-center rounded-full border bg-white ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4"
      @click="showFileManager = !showFileManager"
    >
      <Icon
        name="ic:baseline-add-photo-alternate"
        class="text-muted-400 h-5 w-5"
      />
    </button>
    <div
      v-show="showFileManager"
      tabindex="0"
      class="fixed inset-0 z-50 h-full w-full overflow-auto py-6"
    >
      <div
        class="relative z-50 mx-auto my-0 w-3/4 max-w-full p-3"
        v-show="showFileManager"
      >
        <div
          class="flex flex-col overflow-hidden rounded border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <button
            @click="showFileManager = false"
            class="font-3xl absolute right-0 top-0 m-6 h-6 w-6 fill-current font-bold rtl:left-0"
          >
            &times;
          </button>
          <!-- modal title -->
          <div
            class="border-b px-6 py-3 text-xl font-bold dark:border-gray-700"
          >
            Upload Icon
          </div>
          <!-- modal content -->
          <div class="grow p-6">
            <FileManager @input="uploadAdd" />
          </div>
          <div class="flex justify-end border-t px-6 py-3 dark:border-gray-700">
            <button
              @click="showFileManager = false"
              type="button"
              class="o_btn_neutral"
            >
              Close
            </button>
            <button
              type="button"
              class="bg-primary_focus border-primary_focus hover:bg-primary hover:border-primary focus:bg-primary focus:border-primary inline-block rounded border px-4 py-2 text-center leading-5 text-gray-100 hover:text-white hover:ring-0 focus:outline-none focus:ring-0"
            >
              Saves Changes
            </button>
          </div>
        </div>
      </div>
      <div
        class="fixed inset-0 z-40 h-full w-full overflow-auto bg-black opacity-50"
      ></div>
    </div>
  </div>
</template>

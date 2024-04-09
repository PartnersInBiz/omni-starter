<script setup lang="ts">
const showFileManager = ref(false)
const emitFile: any = getCurrentInstance()

const uploadAdd = (data: any) => {
  emitFile.emit('uploadAdd', data)
  showFileManager.value = false
}
</script>

<template>
  <div class="theme_300 w-full max-w-full shrink">
    <!-- <label for="imageSingle" class="o_label">Thumbnail (80x80 png, gif, svg or jpg)</label> -->
    <div id="imageSingle" class="dropzone single-dropzone mb-4">
      <div class="dz-message" data-dz-message>
        <div class="pre-upload flex flex-col justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cloud-arrow-up mx-auto inline-block h-10 w-10 text-gray-500"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
            ></path>
            <path
              d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
            ></path>
          </svg>
          <div class="py-3 text-center">
            <span>Drag & drop images here</span>
          </div>
        </div>
        <div class="pre-upload text-center">
          <button
            @click="showFileManager = !showFileManager"
            class="theme_200 inline-block rounded px-3 py-1.5 text-center leading-normal"
          >
            Browse file
          </button>
        </div>
      </div>
    </div>

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

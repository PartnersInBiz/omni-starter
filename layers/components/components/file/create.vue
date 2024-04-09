<script setup lang="ts">
const propsAddImage = defineProps({
  accept: {
    type: String,
    default: "image/gif,image/jpeg,image/png,image/bmp,image/jpg",
  },
  label: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  idUpload: {
    type: String,
    default: "image-upload",
  },
  idEdit: {
    type: String,
    default: "image-edit",
  },
  selectedTags: {
    type: Array,
    default: () => {
      return [];
    },
  },
  linkedId: {
    type: String,
    default: "",
  },
});

const { upload, progressFiles, progressFilesName } = useFirebaseFirestore();
const images: any = useState("files", () => []);

function uploadFieldChange(e: {
  target: { files: any };
  dataTransfer: { files: any };
}) {
  const files: any = e.target.files || e.dataTransfer.files;
  if (!files.length) return false;

  createImage(files);
}
function onDrop(e) {
  this.isDragover = false;
  e.stopPropagation();
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (!files.length) return false;

  createImage(files);
}

function createImage(files: any) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image: any = {
        name: file.name,
        src: e.target.result,
        file,
        type: file.type,
        size: file.size,
      };
      console.log("image", image);
      images.value.push(image);
    };
    reader.readAsDataURL(file);
  }
}
const toaster = useToaster();
const em: any = getCurrentInstance();
async function saveImage() {
  let savedImage = await upload(images.value, propsAddImage.selectedTags);
  console.log("saved", savedImage);
  toaster.clearAll();
  toaster.show({
    title: "Success",
    message: `Record has been created!`,
    color: "success",
    icon: "ph:check",
    closable: true,
  });
  em.emit("created", savedImage);
}

onBeforeUnmount(() => {
  images.value = [];
});

function remove(index: number) {
  images.value.splice(index, 1);
}
</script>

<template>
  <div>
    <!-- Controls -->
    <div class="flex items-center gap-2 mb-4">
      <button
        type="button"
        class="relative flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-white border rounded-full cursor-pointer nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600"
        tooltip="Select files"
        @click="$refs.file.click()"
      >
        <Icon
          name="lucide:plus"
          class="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 start-1/2 top-1/2"
        />
        <span class="sr-only">Select files</span>
      </button>
      <button
        type="button"
        class="relative flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-white border rounded-full cursor-pointer nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600"
        tooltip="Start Upload"
        @click="saveImage"
      >
        <Icon name="lucide:arrow-up" class="w-4 h-4" />

        <span class="sr-only">Start Upload</span>
      </button>
      <div>
        <input
          :id="idUpload"
          label="Image upload"
          class="opacity-0"
          name="images"
          :multiple="multiple"
          :accept="accept"
          type="file"
          ref="file"
          @change="uploadFieldChange"
        />
      </div>
    </div>
    <div class="" @dragenter.stop.prevent @dragover.stop.prevent @drop="drop">
      <div
        v-if="!images?.length"
        class="nui-focus border-muted-300 dark:border-muted-700 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-600 dark:focus:border-muted-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-8 transition-colors duration-300"
        tabindex="0"
        role="button"
        @click="$refs.file.click()"
        @keydown.enter.prevent="$refs.file.click()"
      >
        <div class="p-5 text-center">
          <Icon
            name="mdi-light:cloud-upload"
            class="w-10 h-10 mb-2 transition-colors duration-300 text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500"
          />
          <h4 class="font-sans text-sm text-muted-400">Drop files to upload</h4>
          <div>
            <span
              class="text-muted-400 font-sans text-[0.7rem] font-semibold uppercase"
            >
              Or
            </span>
          </div>

          <label
            for="file"
            class="font-sans text-sm underline transition-colors duration-300 cursor-pointer text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 underline-offset-4"
          >
            Select files
          </label>
        </div>
      </div>
      <ul v-else class="mt-6 space-y-2">
        <li v-for="(file, index) in images" :key="file.name">
          <div
            class="relative flex items-center justify-end gap-2 p-3 bg-white border border-muted-200 dark:border-muted-700 dark:bg-muted-800 rounded-xl"
          >
            <div class="flex items-center gap-2">
              <div class="shrink-0">
                <img
                  v-if="file.type.startsWith('image')"
                  class="object-cover object-center h-14 w-14 rounded-xl"
                  :src="file.src"
                  alt="Image preview"
                />
                <img
                  v-else
                  class="object-cover object-center h-14 w-14 rounded-xl"
                  src="/img/avatars/placeholder-file.png"
                  alt="Image preview"
                />
              </div>
              <div class="font-sans">
                <span
                  class="block text-sm text-muted-800 dark:text-muted-100 line-clamp-1"
                >
                  <input
                    v-model="file.name"
                    :placeholder="file.name"
                    class="bg-transparent"
                  />
                  <!-- {{ file.name }} -->
                </span>
                <span class="block text-xs text-muted-400">
                  {{ formatFileSize(file.size) }}
                </span>
              </div>
            </div>

            <div
              class="w-32 px-4 transition-opacity duration-300 ms-auto"
              :class="'opacity-100'"
            >
              <BaseProgress
                v-if="progressFilesName[file.name]"
                :value="progressFilesName[file.name]"
                size="xs"
                :color="'success'"
              />
              <BaseProgress v-else :value="0" size="xs" :color="'success'" />
            </div>
            <div class="flex gap-2">
              <button
                class="relative flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-white border rounded-full cursor-pointer border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
                disabled
                type="button"
                tooltip="Cancel"
              >
                <Icon name="lucide:slash" class="w-4 h-4" />
                <span class="sr-only">Cancel</span>
              </button>

              <button
                class="relative flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-white border rounded-full cursor-pointer border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600"
                type="button"
                tooltip="Upload"
                @click="upload([file], propsAddImage.selectedTags)"
              >
                <Icon name="lucide:arrow-up" class="w-4 h-4" />
                <span class="sr-only">Upload</span>
              </button>
              <button
                class="relative flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-white border rounded-full cursor-pointer border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600"
                type="button"
                tooltip="Remove"
                @click.prevent="remove(index)"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
                <span class="sr-only">Remove</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- </BaseInputFileHeadless> -->
  </div>
</template>

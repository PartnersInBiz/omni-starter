<script setup lang="ts">
const searchUnsplash = ref("");
const currentPage: any = ref(1);
const pages = ref(20);
const perPageUnsplash = ref(30);
const letOrderBy = ref(false);
const orderBy = ref("relevant");
const orderByOptions = ref(["relevant", "latest"]);
const collections = ref(" ");
const letContentFilter = ref(false);
const contentFilter = ref("low");
const contentFilterOptions = ref(["low", "high"]);
const letColor = ref(false);
const color = ref("");
const colorOptions = ref([
  " ",
  "black_and_white",
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue",
]);
const letOrientation = ref(false);
const orientations = ref("landscape");
const orientationOptions = ref(["landscape", "portrait", "squarish"]);
const statusset: any = ref({});
const currentx = ref(5);
const itemsPerPage = ref(8);
const totalPages = computed(() => {
  return statusset.value.total_pages ? statusset.value.total_pages : 0;
});
watch(
  () => currentPage.value,
  (val) => {
    searchTerm(val);
  }
);
const unsplashInstance: any = getCurrentInstance();
const selected: any = ref([]);
const selectedDocs: any = ref([]);
function submitDocs() {
  console.log(selectedDocs.value);
  unsplashInstance.emit("input", selectedDocs.value);
}

function isSelected(id: string) {
  return selected.value.includes(id);
}

function onUpdateCurrentPage(ctPage: number) {
  console.log("CURR", ctPage);
  currentPage.value = ctPage;
}

function select(img: { id: any; src: string; alt_description: string }) {
  if (isSelected(img.id)) {
    const index = selectedDocs.value.findIndex((doc: any) => doc.id === img.id);
    selected.value.splice(index, 1);
    selectedDocs.value.splice(index, 1);
    submitDocs();
  } else {
    console.log("selected", img);
    selected.value.push(img.id);
    selectedDocs.value.push({
      src: img.src,
      name: img.alt_description,
      id: img.id,
      type: "image/png",
    });
    submitDocs();
  }
}

function userImageNow(data: any) {
  const payload = { ...data, origin: "unsplash", src: data.urls.regular };

  select(payload);
}
async function searchTerm(page: any) {
  statusset.value = [];
  let url = `https://api.unsplash.com/search/photos?client_id=bd1cnz9Q0gEsiTCSV67IPfUCBXpi_9Yiziook5RuHlM&query=${searchUnsplash.value}&page=${page}&per_page=${perPageUnsplash.value}&order_by=${orderBy.value}`;

  if (letContentFilter.value)
    url = `${url}&content_filter=${contentFilter.value}`;

  if (letColor.value) url = `${url}&color=${color.value}`;

  if (letOrientation.value) url = `${url}&orientation=${orientations.value}`;

  const result = await useFetch<any>(url);
  console.log("res", result);
  statusset.value = result.data.value;
  // result.then((data: any) => {
  //   for (let i = 0; i < data.results.length; i++)
  //     statusset.value.push(data.results[i])
  // })
}
</script>

<template>
  <div>
    <div class="content-center pt-2">
      <div class="">
        <div class="flex justify-between">
          <div class="w-24">
            <BaseInput
              icon="ic:twotone-numbers"
              label="Per page"
              placeholder="0"
              v-model="perPageUnsplash"
              type="number"
              condensed
              class="w-24"
            />
          </div>

          <div class="pt-8 space-x-2">
            <BaseCheckbox
              label="Colour"
              shape="rounded"
              color="primary"
              v-model="letColor"
            />
            <BaseCheckbox
              label="Order By"
              shape="rounded"
              color="primary"
              v-model="letOrderBy"
            />
            <BaseCheckbox
              label="Content Filter"
              shape="rounded"
              color="primary"
              v-model="letContentFilter"
            />
            <BaseCheckbox
              label="Orientation"
              shape="rounded"
              color="primary"
              v-model="letOrientation"
            />
          </div>
        </div>

        <BaseInput
          v-model="searchUnsplash"
          shape="curved"
          placeholder="Search Unsplash..."
          :classes="{
            wrapper: 'w-full sm:w-auto',
          }"
          class="shadow-xl"
        />
        <button
          type="button"
          class="relative flex items-center justify-center float-right w-8 h-8 transition-colors duration-300 bg-white border rounded-full cursor-pointer nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 -mt-9"
          tooltip="Select files"
          @click="searchTerm(1)"
        >
          <Icon
            name="lucide:search"
            class="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 start-1/2 top-1/2"
          />
          <span class="sr-only">Select files</span>
        </button>

        <div class="grid grid-cols-4 gap-4 my-1">
          <BaseSelect
            shape="rounded"
            label="Order By"
            v-if="letOrderBy"
            v-model="orderBy"
            placeholder="Order By"
          >
            <option value="" hidden></option>
            <option
              v-for="(order, index) in orderByOptions"
              :key="index"
              :label="order"
              :value="order"
            >
              {{ order }}
            </option>
          </BaseSelect>

          <BaseSelect
            shape="rounded"
            label="Content Filter"
            v-if="letContentFilter"
            v-model="contentFilter"
            placeholder="Content Filter"
          >
            <option value="" hidden></option>
            <option
              v-for="(order, index) in contentFilterOptions"
              :key="index"
              :label="order"
              :value="order"
            >
              {{ order }}
            </option>
          </BaseSelect>

          <BaseSelect
            shape="rounded"
            label="Colour"
            v-if="letColor"
            v-model="color"
            placeholder="Colour"
          >
            <option value="" hidden></option>
            <option
              v-for="(order, index) in colorOptions"
              :key="index"
              :label="order"
              :value="order"
            >
              {{ order }}
            </option>
          </BaseSelect>

          <BaseSelect
            shape="rounded"
            label="Orientation"
            v-if="letOrientation"
            v-model="orientations"
            placeholder="Orientation"
          >
            <option value="" hidden></option>
            <option
              v-for="(order, index) in orientationOptions"
              :key="index"
              :label="order"
              :value="order"
            >
              {{ order }}
            </option>
          </BaseSelect>
        </div>
      </div>
    </div>

    <UnsplashImage
      :photos="statusset.results"
      class="my-1"
      @userimagesend="userImageNow"
    />
    <BasePagination
      :item-per-page="itemsPerPage"
      :total-items="totalPages"
      :current-page="currentPage"
      :max-links-displayed="5"
      @update:currentPage="onUpdateCurrentPage"
      shape="curved"
    />
  </div>
</template>

<script setup lang="ts">
const props: any = withDefaults(
  defineProps<{
    country: string
    countryFull: any
  }>(),
  {
    country: 'South Africa',
  },
)

const { getCountry } = useCountry()
const route = useRoute()
const router = useRouter()
const page = ref(1)
const filter = ref('')
const perPage = ref(10)
const data: any = ref({})
const dataSelected: any = ref({})
watch([filter, perPage], () => {
  router.push({
    query: {
      page: undefined,
    },
  })
})

const search = (val: string) => {
  filter.value = val
}
const em: any = getCurrentInstance()
const selectedCountry = ref('')
const selectedData: any = ref({})
const querySelected = computed(() => {
  return {
    filter: selectedCountry.value,
    perPage: perPage.value,
    page: page.value,
  }
})

onMounted(() => {
  selectedCountry.value = props.country
})

watch(
  () => props.country,
  () => {
    selectedCountry.value = props.country
  },
)

watch(
  () => selectedCountry.value,
  async () => {
    dataSelected.value = getCountry(query.value)
    if (dataSelected.value.data) {
      if (dataSelected.value.data.length > 0) {
        selectedData.value = dataSelected.value.data[0]
        if (dataSelected.value.data[0].name === selectedCountry.value)
          em.emit('selectedCountry', dataSelected.value.data[0])
      }
    } else {
      console.error('ERROR', dataSelected.value.data)
    }
  },
)

const query = computed(() => {
  return {
    filter: filter.value,
    perPage: perPage.value,
    page: page.value,
  }
})

onMounted(() => {
  data.value = getCountry(query.value)
})
const updatePage = (pg: number) => {
  page.value = pg
}
const isModalBodyOpen = ref(false)
</script>
<template>
  <div
    class="flex items-center gap-2 p-4 rounded-lg bg-muted-100 dark:bg-muted-700/70"
  >
    <Modal :open="isModalBodyOpen" size="lg" @close="isModalBodyOpen = false">
      <BaseCard>
        <template #header>
          <!-- Header -->
          <div class="flex items-center justify-between w-full p-4 md:p-6">
            <div class="flex items-center justify-between w-full">
              <SearchCompact @search="search" />
            </div>
            <BaseButtonClose @click="isModalBodyOpen = false" />
          </div>
        </template>

        <!-- Body -->
        <div class="p-4 md:p-6">
          <div class="relative w-16" v-if="selectedData">
            <input
              type="radio"
              name="country_selection"
              class="absolute top-0 z-20 opacity-0 cursor-pointer peer start-0 size-full"
              checked
            />
            <div
              class="flex items-center justify-center transition-all duration-300 border-2 rounded-full shadow-lg border-muted-200 peer-checked:border-primary-500 dark:border-muted-600 group size-14"
            >
              <img
                class="rounded-full size-10"
                :src="selectedData.image"
                alt="flag icon"
              />
            </div>
            <div
              class="absolute flex items-center justify-center text-white border-4 border-white rounded-full bg-primary-500 dark:border-muted-800 -end-1 -top-1 size-7"
            >
              <Icon name="feather:check" class="size-3" />
            </div>
          </div>
          <div class="relative grid grid-cols-5 gap-2 my-4">
            <div
              class="relative"
              v-for="(cntry, index) in data.data"
              :key="index"
            >
              <div class="relative w-16">
                <input
                  type="radio"
                  name="country_selection"
                  class="absolute top-0 z-20 opacity-0 cursor-pointer peer start-0 size-full"
                  checked
                  v-model="selectedCountry"
                  :value="cntry.name"
                />
                <div
                  class="flex items-center justify-center transition-all duration-300 border-2 rounded-full shadow-lg border-muted-200 peer-checked:border-primary-500 dark:border-muted-600 group size-14"
                >
                  <img
                    class="rounded-full size-10"
                    :src="cntry.image"
                    alt="flag icon"
                  />
                </div>
                <div
                  class="absolute items-center justify-center hidden text-white border-4 border-white rounded-full bg-primary-500 dark:border-muted-800 -end-1 -top-1 size-7 peer-checked:flex"
                >
                  <Icon name="feather:check" class="size-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <BasePagination
            :item-per-page="perPage"
            :total-items="data.total"
            :current-page="page"
            :max-links-displayed="5"
            shape="curved"
            no-router
            @update:current-page="updatePage"
          />
        </template>
      </BaseCard>
    </Modal>
    <BaseAvatar v-if="countryFull?.image" size="xs" :src="countryFull?.image" />
    <BaseText size="sm" class="text-muted-500 dark:text-muted-400">{{
      country
    }}</BaseText>
    <div class="ms-auto">
      <div
        @click="isModalBodyOpen = !isModalBodyOpen"
        class="font-sans text-sm text-primary-500 underline-offset-4 hover:underline"
      >
        Changes
      </div>
    </div>
  </div>
</template>

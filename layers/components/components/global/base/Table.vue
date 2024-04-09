<script setup lang="ts">
const props: any = defineProps({
  xlsxData: {
    type: Array,
    default: () => {
      return []
    },
  },
})

const dataRetrieved = ref([])
const route = useRoute()
const router = useRouter()
const page = ref(1)
const filter = ref('')
const perPage = ref(10)
const totalItems = ref(0)
const data = ref([])

const updatePage = (pg: number) => {
  page.value = pg
  getData()
}
watch([filter, perPage], () => {
  getData()
})

const filterData = () => {
  if (dataRetrieved.value)
    return dataRetrieved.value.filter(
      (item: any) => item,
      //   item.name.includes(filter.value),
    )
  else return []
}

watch(
  () => props.xlsxData.length,
  () => {
    retrieveData()
    getData()
  },
)

const retrieveData = () => {
  dataRetrieved.value = props.xlsxData
}

onMounted(async () => {
  retrieveData()
  getData()
})

const getData = async () => {
  // Calculate the start and end indexes for the page
  const startIndex = (page.value - 1) * perPage.value
  const endIndex = startIndex + perPage.value
  // Return the sliced portion of the data array
  data.value = filterData().slice(startIndex, endIndex)
  totalItems.value = filterData().length
}
getData()
</script>

<template>
  <div>
    <ContentWrapper>
      <template #left>
        <BaseInput
          v-model="filter"
          icon="lucide:search"
          placeholder="Filter data..."
          :classes="{
            wrapper: 'w-full sm:w-auto',
          }"
        />
      </template>
      <template #right>
        <BaseSelect
          v-model="perPage"
          label=""
          :classes="{
            wrapper: 'w-full sm:w-40',
          }"
        >
          <option :value="10">10 per page</option>
          <option :value="25">25 per page</option>
          <option :value="50">50 per page</option>
          <option :value="100">100 per page</option>
        </BaseSelect>
      </template>
      <div>
        <div v-if="data?.length === 0">
          <BasePlaceholderPage
            title="No matching results"
            subtitle="Looks like we couldn't find any matching results for your search terms. Try other search terms."
          >
            <template #image>
              <img
                class="block dark:hidden"
                src="/img/illustrations/placeholders/flat/placeholder-search-4.svg"
                alt="Placeholder image"
              />
              <img
                class="hidden dark:block"
                src="/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg"
                alt="Placeholder image"
              />
            </template>
          </BasePlaceholderPage>
        </div>
        <div v-else>
          <client-only>
            <div class="mt-10 w-full">
              <TransitionGroup
                enter-active-class="transform-gpu"
                enter-from-class="opacity-0 -translate-x-full"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="absolute transform-gpu"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-full"
              >
                <FlexTableRow
                  v-for="(item, index) in data"
                  :key="index"
                  shape="curved"
                  spaced
                >
                  <template #end>
                    <FlexTableCell
                      :label="key"
                      :hide-label="index > 0"
                      class="w-full sm:w-40"
                      v-for="(value, key, indx) in item"
                      :key="indx"
                    >
                      <span
                        class="text-muted-500 dark:text-muted-400 font-sans text-sm"
                      >
                        {{ value }}
                      </span>
                    </FlexTableCell>
                  </template>
                </FlexTableRow>
              </TransitionGroup>
            </div>
          </client-only>
          <div class="mt-6">
            <BasePagination
              :total-items="totalItems"
              :item-per-page="perPage"
              :current-page="page"
              shape="curved"
              no-router
              @update:current-page="updatePage"
            />
          </div>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

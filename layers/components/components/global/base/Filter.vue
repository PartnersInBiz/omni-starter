<script setup lang="ts">
import { string } from 'zod'

const props = withDefaults(
  defineProps<{
    className: string
    withFields: string
    withWhere: any
    limit?: number
    offset?: number
    displayValues?: any
    filterValue?: string
  }>(),
  {
    limit: 10,
    offset: 0,
  },
)
const items = ref([])

const search = ref('')
const itemSelected = ref(false)

const filteredCustomers: any = computed(() => {
  if (!search.value) {
    return []
  }

  return items.value
    .filter((item: any) => {
      return (
        item[props.displayValues[0]]?.match(new RegExp(search.value, 'i')) ||
        item[props.displayValues[1]]?.match(new RegExp(search.value, 'i'))
      )
    })
    .splice(0, 4)
})

const { SearchPaginateAll } = useWeaviateSearch()

watch(
  () => search.value,
  async () => {
    let withWhere = props.withWhere

    withWhere = {
      operator: 'And',
      operands: [
        ...withWhere.operands,
        {
          path: [props.filterValue],
          operator: 'GreaterThanEqual',
          valueText: search.value,
        },
      ],
    }
    console.log('withWhere', withWhere)
    let rec = await SearchPaginateAll(
      props.className,
      props.withFields,
      withWhere,
      props.limit,
      props.offset,
    )
    items.value = rec
    console.log(rec)
  },
)

const em: any = getCurrentInstance()?.emit
const item: any = ref(null)
function selectCustomer(itemData: any) {
  em('selected', itemData)
  itemSelected.value = true
  item.value = itemData
  search.value = ''
}

function dismissCustomer() {
  itemSelected.value = false
  item.value = ''
}
</script>

<template>
  <div class="relative">
    <BaseInput
      v-if="!itemSelected"
      v-model="search"
      icon="lucide:search"
      shape="curved"
      placeholder="ex: Figma, Github, ..."
      :classes="{
        input: 'h-12 text-base !ps-12',
        icon: 'h-12 w-12',
      }"
    />
    <div v-else class="flex items-center gap-3">
      <!-- <BaseAvatar
        size="sm"
        :src="project.item?.logo"
        class="bg-muted-100 dark:bg-muted-700/60"
      /> -->
      <div class="flex flex-col">
        <h3
          class="font-sans text-sm font-semibold text-muted-800 dark:text-muted-100"
        >
          {{ item[displayValues[0]] }}
        </h3>
        <p
          class="font-sans text-xs text-muted-500 dark:text-muted-400"
          v-if="Array.isArray(item[displayValues[1]])"
        >
          <template v-for="element in item[displayValues[1]]">
            <span>{{ element }}</span>
          </template>
        </p>
        <p class="font-sans text-xs text-muted-500 dark:text-muted-400" v-else>
          {{ item[displayValues[1]] }}
        </p>
      </div>
      <div class="me-3 ms-auto">
        <BaseButtonIcon small shape="full" @click="dismissCustomer">
          <Icon name="lucide:x" class="size-4" />
        </BaseButtonIcon>
      </div>
    </div>

    <div
      class="absolute w-full p-4 transition-all duration-300 bg-white border shadow-xl border-muted-200 dark:border-muted-700 dark:bg-muted-800 shadow-muted-300/30 dark:shadow-muted-900/30 start-0 top-14 rounded-xl"
      :class="
        search.length > 0
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 pointer-events-none translate-y-1'
      "
    >
      <!-- Results -->
      <div
        v-if="filteredCustomers.length > 0"
        class="slimscroll max-h-[248px] space-y-2 overflow-y-auto"
      >
        <!-- Result -->
        <div
          v-for="item in filteredCustomers"
          :key="item.name"
          role="button"
          class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted-100"
        >
          <BaseAvatar size="sm" :src="item.logo" />
          <div class="flex flex-col">
            <h3
              class="font-sans text-sm font-semibold text-muted-800 dark:text-muted-100"
            >
              {{ item[displayValues[0]] }}
            </h3>
            <p
              class="font-sans text-xs text-muted-500 dark:text-muted-400"
              v-if="Array.isArray(item[displayValues[1]])"
            >
              <template v-for="element in item[displayValues[1]]">
                <span>{{ element }}</span>
              </template>
            </p>
            <p
              class="font-sans text-xs text-muted-500 dark:text-muted-400"
              v-else
            >
              {{ item[displayValues[1]] }}
            </p>
          </div>
          <div class="ms-auto">
            <BaseButtonIcon small shape="full" @click="selectCustomer(item)">
              <Icon name="lucide:plus" class="size-4" />
            </BaseButtonIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

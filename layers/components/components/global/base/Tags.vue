<script setup lang="ts">
const props: any = withDefaults(
  defineProps<{
    multiple?: boolean
    icon?: string
    shape?: 'straight' | 'rounded' | 'curved'
    label?: string
    placeholder?: string
  }>(),
  {
    icon: 'ph:users-three',
    shape: 'rounded',
    label: 'Tag',
    placeholder: 'Search...',
    multiple: true,
  },
)
const value = ref<string[]>([])
const em: any = getCurrentInstance()

watch(
  () => value.value.length,
  () => {
    console.log('length', value.value.length)
    em.emit('created', value.value)
  },
)
const frameworks = ref([
  'Javascript',
  'Nuxt',
  'Vue.js',
  'React.js',
  'Angular',
  'Alpine.js',
])
const isOpen = ref(false)

const created = (data: any) => {
  frameworks.value.push(data.title)
}
</script>

<template>
  <div>
    <Modal
      :classes="{
        wrapper: '!items-start pt-20',
        dialog: 'p-3 rounded-xl',
      }"
      :open="isOpen"
      size="md"
      @close="isOpen = false"
    >
      <FormsSingle
        icon="gis:tags"
        col="tags"
        title="Create a tag"
        subtitle="Organize your data with tags"
        title-placeholder="Large"
        description-placeholder="Size of clothes"
        @created="created"
      />
    </Modal>

    <BaseAutocomplete
      v-model="value"
      :items="frameworks"
      :shape="shape"
      :icon="icon"
      :placeholder="placeholder"
      :label="label"
      :multiple="multiple"
    />
    <button
      type="button"
      class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 relative float-right -mt-9 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
      tooltip="Select files"
      @click="isOpen = true"
    >
      <Icon
        name="lucide:plus"
        class="absolute start-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
      />
      <span class="sr-only">Select files</span>
    </button>
  </div>
</template>

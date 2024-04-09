<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    tags?: string[]
    class: string
    item_id: string
  }>(),
  {
    shape: 'rounded',
  },
)

const emit = defineEmits(['input', 'select'])
const search = ref('')
watch(
  () => search,
  (val: any) => {
    emit('input', val)
  },
)

const select = (val: string) => {
  emit('select', val)
}

const input = (val: string) => {
  search.value = val
}

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <div class="flex w-full items-center justify-between">
      <SearchCompact
        :tags="tags"
        :shape="shape"
        @input="input"
        @select="select"
      />
    </div>
  </BaseCard>
</template>

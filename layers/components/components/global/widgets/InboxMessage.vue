<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    name?: string
    picture?: string
    title?: string
    text?: string
    time?: string
    item_id: string
  }>(),
  {
    shape: 'rounded',
    name: undefined,
    picture: undefined,
    title: undefined,
    text: undefined,
    time: undefined,
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <InboxMessage
      :picture="picture"
      :name="name"
      :title="title"
      :text="text"
      :time="time"
      :shape="shape"
    />
  </BaseCard>
</template>

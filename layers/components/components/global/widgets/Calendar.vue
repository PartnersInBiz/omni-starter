<script setup lang='ts'>
import { Calendar } from 'v-calendar'

import 'v-calendar/dist/style.css'
import '~/assets/css/vcalendar.css'

const props = withDefaults(
  defineProps<{
    shape?: 'straight' | 'rounded' | 'curved'
    class?: string
    attributes: any
    titleposition: string
    expanded: boolean
    borderless: boolean
    transparent: boolean
    trimweeks: boolean
    classcalendar: string
    item_id: string
  }>(),
  {
    shape: 'rounded',
    class: '',
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <Calendar
      :attributes="attributes"
      :title-position="titleposition"
      :expanded="expanded"
      :borderless="borderless"
      :transparent="transparent"
      :trim-weeks="trimweeks"
      :class="classcalendar"
      
    />
  </BaseCard>
</template>
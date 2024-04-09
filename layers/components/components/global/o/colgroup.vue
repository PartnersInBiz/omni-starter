<script setup lang="ts">
const divPropsLive = defineProps({
  item_id: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
  style: {
    type: String,
    default: "",
  },
  innerText: {
    type: String,
    default: "",
  },
  isClickable: {
    type: Boolean,
    default: false,
  },
  children: {
    type: Array,
    default: () => {
      return [];
    },
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const classes = computed(() => divPropsLive.class);

const isEditAppState = useState("isEditAppState", () => {
  return false;
});


</script>

<template>
  <colgroup :id="item_id" :class="classes" :style="style">
    <component
      :is="comp.comp"
      v-for="(comp, index) in children"
      :key="index"
      v-bind="comp.schema"
    >
      <template
        v-for="(slot, index) in comp.slots"
        :key="index"
        v-slot:[slot.slot]="slotProps"
      >
        <component
          v-bind="{ ...slotProps, ...slcomp.schema }"
          :class="slcomp.shema?.class"
          :is="slcomp.comp"
          v-for="(slcomp, index) in slot.components"
          :key="index"
        >
        </component>
      </template>
    </component>
  </colgroup>
</template>

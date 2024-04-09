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

const changeData = computed(() => {
  let text = divPropsLive.innerText;
  if (divPropsLive.data) {
    let keys = Object.keys(divPropsLive.data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let txt = `{{${key}}}`;
      let dt = divPropsLive.data[key];
      text = text.replace(txt, dt);
    }
  }
  return text;
});

const classes = computed(() => divPropsLive.class);

const isEditAppState = useState("isEditAppState", () => {
  return false;
});


</script>

<template>
  <button
    :id="item_id"
    :class="classes"
    :style="style"
    
  >
    {{ changeData }}
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
        </component> </template
    ></component>
  </button>
</template>

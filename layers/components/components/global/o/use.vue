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
  transform: {
    type: String,
    default: "",
  },
  fill: {
    type: String,
    default: "",
  },
  stroke: {
    type: String,
    default: "",
  },
  strokewidth: {
    type: String,
    default: "",
  },
  x: {
    type: String,
    default: "",
  },
  y: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  fillrule: {
    type: String,
    default: "",
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
  <use
    :id="item_id"
    :transform="transform"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokewidth"
    :fill-rule="fillrule"
    :class="classes"
    :x='x'
    :y='y'
    :href='href'
    
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
        </component>
      </template>
    </component>
  </use>
</template>

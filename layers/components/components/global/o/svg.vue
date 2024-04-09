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
  xlms: {
    type: String,
    default: "http://www.w3.org/2000/svg",
  },
  fill: {
    type: String,
    default: "none",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  viewBox: {
    type: String,
    default: "0 0 24 24",
  },
  str: {
    type: String,
    default: "",
  },
  stroke: {
    type: String,
    default: "currentColor",
  },
  strokewidth: {
    type: String,
    default: "2",
  },
  strokelinecap: {
    type: String,
    default: "round",
  },
  strokelinejoin: {
    type: String,
    default: "round",
  },

  outerHTML: {
    type: String,
    default: "",
  },
 
  xmlns: {
    type: String,
    default: "http://www.w3.org/2000/svg",
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  ariaHidden: {
    type: String,
    default: "true",
  },
  role: {
    type: String,
    default: "img",
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
  <client-only>
 
<div v-html="outerHTML"></div>

  </client-only>
</template>

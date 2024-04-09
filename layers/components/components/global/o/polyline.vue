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
  transform: {
    type: String,
    default: "",
  },
  fill: {
    type: String,
    default: "none",
  },
  points: {
    type: String,
    default: "",
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
  <polyline
    :id="item_id"
    :class="classes"
    :style="style"
    :transform="transform"
    :fill="fill"
    :points="points"
  />
</template>

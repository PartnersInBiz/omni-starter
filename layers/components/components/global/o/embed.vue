<script setup lang="ts">
const divPropsLive = defineProps({
  item_id: {
    type: String,
    default: "",
  },
  classes: {
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
  type: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
  height: {
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

const isEditAppState = useState("isEditAppState", () => {
  return false;
});


</script>

<template>
  <embed :type="type" :src="src" :width="width" :height="height" />
</template>

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
  src: {
    type: String,
    default: "",
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
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
  <div :id="item_id" :class="classes" :style="style">
    <video
      :id="item_id"
      :src="src"
      :class="classes"
      :style="style"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
    />
  </div>
</template>

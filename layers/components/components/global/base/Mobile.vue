<script setup lang="ts">
import { getMobile } from "../../../utils/mobile";
const props: any = defineProps({
  title: {
    type: String,
    default: "Phone",
  },
  mobile: {
    type: Object,
    default: () => {
      return {
        dial_code: "+27",
      };
    },
  },
});

const filter = ref("");
const [modelValue] = defineModel<any>();

const data = await getMobile();
const code = ref("+27");
const number = ref("");
const em: any = getCurrentInstance();
const phone = computed(() => {
  let country = {};
  if (data)
    country = data.filter(
      (dt: { dial_code: string }) => dt.dial_code == code.value
    )[0];
  let num = code.value + number.value;
  return {
    ...country,
    phone: num,
    number: number.value,
  };
});

onMounted(() => {
  if (props.mobile.dial_code) code.value = props.mobile.dial_code;
  //remove any curly braces and spaces and dashes from the number and make sure is number
  if (props.mobile.number)
    number.value = props.mobile.number.replace(/[^0-9]/g, "");
});
watch(
  () => code.value,
  () => {
    em.emit("mobile", phone.value);
  }
);

watch(
  () => number.value,
  () => {
    em.emit("mobile", phone.value);
  }
);
</script>

<template>
  <div>
    <div class="flex w-full">
      <BaseSelect label="Code" v-model="code">
        <option value="" hidden></option>
        <option
          v-for="(pos, index) in data"
          :key="index"
          :value="pos.dial_code"
        >
          {{ pos.emoji }} {{ pos.dial_code }}
        </option>
      </BaseSelect>
      <BaseInput
        :label="title"
        icon="material-symbols:deskphone-rounded"
        placeholder=""
        v-model="modelValue"
        type="text"
      />
    </div>
  </div>
</template>

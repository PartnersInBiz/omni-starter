<script setup lang="ts">
const prop = defineProps({
  industry: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "Select an Industry",
  },
});
const filter = ref("");
const value = ref("");
const perPage = ref(40);
const page = ref(1);

onMounted(() => {
  if (prop.industry) value.value = prop.industry;
});

watch(
  () => prop.industry,
  () => {
    if (prop.industry) value.value = prop.industry;
  }
);

const { data, pending, error, refresh } = await useFetch();
// useApiRoute(
//   `/api/industries?filter=${filter.value}&perPage=${perPage.value}&page=${page.value}`,
// ),

const em: any = getCurrentInstance();
watch(
  () => value.value,
  () => {
    em.emit("industrySelect", value.value);
  }
);
</script>
<template>
  <div>
    <BaseSelect v-model="value" shape="rounded" :label="label">
      <option v-for="(ind, index) in data.data" :key="index" :value="ind.name">
        {{ ind.name }}
      </option>
    </BaseSelect>
  </div>
</template>

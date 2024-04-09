<script setup lang="ts">
const props = defineProps<{
  name: string;
  subsidebar: {
    name: string;
    icon: string;
    comp: string;
    exact?: boolean;
  }[];
}>();

const open = ref(false);
const { page, componentAddeds } = useBuilders();
const compShows: any = ref([]);

const addOrRemove = (comp: any) => {
  if (compShows.value.includes(comp)) {
    compShows.value = compShows.value.filter((c: any) => c !== comp);
  } else {
    compShows.value.push(comp);
  }
};

const editFormFields = computed(() => {
  if (edit.value.schema) {
    // loop through the schema object and place the values in the fields array
    const fields = [];
    for (const key in edit.value.schema) {
      fields.push({
        label: key,
        name: key,
        as: "input",
        type: "text",
        placeholder: key,
        component: "BaseInput",
        shape: "curved",
        icon: "mdi:pen",
        value: edit.value.schema[key],
        required: true,
        disabled: false,
        class: "col-span-6",
      });
    }
    return fields;
  } else {
    return [];
  }
});
const edit: any = ref({});
const showEdit = ref(false);
const editComponent = (comp: any) => {
  console.log(comp);
  //clone the comp object
  console.log(JSON.parse(JSON.stringify(comp)));
  edit.value = JSON.parse(JSON.stringify(comp));
  console.log(edit.value, "CLONED");
  showEdit.value = true;
};

const schema = computed(() => {
  return {
    rules: [],
    superRefine: [],
    fields: editFormFields.value,
  };
});

const submit_form = () => {
  console.log(edit.value);
  componentAddeds(edit.value);
  showEdit.value = false;
};

const updated_form = (data: any) => {
  // loop over data and update the edit.value.schema
  for (const key in data) {
    edit.value.schema[key] = data[key];
  }
  // edit.value.schema = data;
};
</script>

<template>
  <li class="mb-1 min-h-[2rem] items-center">
    <Modal :open="showEdit" size="md" @close="showEdit = false">
      <div class="p-4 overflow-auto" v-if="edit.comp">
        <div>
          <component :is="edit.comp" v-bind="edit.schema">
            <template
              v-for="(slot, index) in edit.slots"
              :key="index"
              v-slot:[slot.slot]="slotProps"
            >
              <component
                :is="slot.comp"
                v-bind="{ ...slotProps, ...slot.schema }"
                :class="slot.shema?.class"
              >
                {{ slot.innerText }}
              </component>
            </template>
          </component>
        </div>
        <builder-form-generator
          :schema="schema"
          @updated_form="updated_form"
          @submitted_form="submit_form"
        >
        </builder-form-generator>
        <div class="mt-6">
          <div class="block w-full rounded-md shadow-sm">
            <BaseButton
              type="submit"
              shape="curved"
              color="primary"
              class="!h-11 w-full mt-2"
              @click.prevent="submit_form"
            >
              Use Component
            </BaseButton>
          </div>
        </div>
      </div>
    </Modal>
    <NuxtLink
      class="flex items-center w-full transition-colors duration-300 nui-focus text-muted-400 hover:text-primary-500"
      @click.passive="open = !open"
    >
      <span class="font-sans text-sm">{{ props.name }}</span>
    </NuxtLink>
    <div
      class="transition-all duration-150"
      :class="{
        'max-h-0 overflow-hidden opacity-0 group-focus-within:max-h-max group-focus-within:overflow-visible group-focus-within:opacity-100':
          !open,
        'max-h-max opacity-100': open,
      }"
    >
      <div v-if="open">
        <div v-for="(comp, index) in subsidebar" :key="index">
          <div class="flex items-center justify-between text-muted-400">
            <p class="text-xs">
              {{ comp.name }}
            </p>
            <div class="space-x-2">
              <Icon
                :name="
                  compShows.includes(comp.name) ? 'mdi:eye-off' : 'mdi:eye'
                "
                class="w-4 h-4 hover:text-primary-500"
                @click="addOrRemove(comp.name)"
              />
              <Icon
                name="mdi:plus"
                class="w-4 h-4 hover:text-primary-500"
                @click="componentAddeds(comp)"
              />
              <Icon
                name="mdi:pencil-outline"
                class="w-4 h-4 hover:text-primary-500"
                @click="editComponent(comp)"
              />
            </div>
          </div>
          <div v-if="compShows.includes(comp.name)">
            <KeepAlive>
              <component
                :is="resolveComponentOrNative(comp?.comp)"
                :key="comp?.comp"
                v-if="comp?.comp"
                v-bind="comp?.schema"
              >
                <template
                  v-for="(slot, inex) in comp.slots"
                  :key="inex"
                  v-slot:[slot.slot]="slotProps"
                >
                  <component
                    :is="slot.comp"
                    v-bind="{ ...slotProps, ...slot.schema }"
                  >
                    <p v-if="slot.innerText">{{ slot.innerText }}</p>
                    <template
                      v-for="(slot2, indx) in slot.slots"
                      :key="indx"
                      v-slot:[slot2.name]="slotProps2"
                    >
                      {{ slot2.text }}
                      <component
                        :is="slot2.comp"
                        v-bind="{ ...slotProps2, ...slot2.schema }"
                      />
                    </template>
                  </component>
                </template>
              </component>
            </KeepAlive>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
  
  
  
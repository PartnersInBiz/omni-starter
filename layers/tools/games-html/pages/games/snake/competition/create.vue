<script setup lang="ts">

definePageMeta({
  title: 'Snake Game',
  preview: {
    title: 'Form layout 2',
    description: 'For forms and input fields',
    categories: ['layouts', 'forms'],
    src: '/img/screens/layouts-form-2.png',
    srcDark: '/img/screens/layouts-form-2-dark.png',
    order: 48,
  },
})
const { weaviateClassesName, createClassesWithCrossReference } = useWeaviate();
const { ObjectCreateWithMulitCrossReferences } = useWeaviateObjectCreate();
const { snakeFormSchema: schema } = useSnakeForms()

const value: any = ref({});

const submit_form = async () => {
  let state = value.value;
  state = removeUndefined(state);

  // if (state.customer && Object.keys(state.customer).length > 0) {
  //   state.hasCategory.push({ customer: state.customer });
  // }

  console.log("state", state);
  console.log(
    "weaviateApplicationClasses",
    weaviateClassesName.value.Application
  );
  if (
      typeof state.start_date !== "string" ||
      state.start_date !== null ||
      state.start_date !== undefined
    ) {
      state.start_date = new Date().toISOString();
    }

    if (
      typeof state.end_date !== "string" ||
      state.end_date !== null ||
      state.end_date !== undefined
    ) {
      state.end_date = new Date().toISOString();
    }
  // delete state.customer;
  // console.log("state", state);

  // if (state.team.length > 0) {
  //   state.hasCategory.push({ team: state.team });
  // }
  console.log(
    "createClassesWithCrossReference(weaviateApplicationClasses)",
    createClassesWithCrossReference(weaviateClassesName.value.Snake)
  );
  let s = await ObjectCreateWithMulitCrossReferences(
    "Snake",
    state,
    createClassesWithCrossReference(weaviateClassesName.value.Snake)
  );
};
const updated_form = (data: any) => {
  value.value = data;
};
</script>

<template>
  <div

    class="grid grid-cols-12 gap-6"
  >
    <div class="col-span-12 ltablet:col-span-8 lg:col-span-8">
      <BaseCard shape="rounded" class="p-4 md:p-8">
        <div class="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-12">
          <div class="col-span-12 mb-10 text-gray-600 sm:col-span-3 sm:mb-0">
            <BaseHeading as="h2" size="lg" weight="medium">
              New Snake Competition
            </BaseHeading>
            <BaseText size="xs" class="text-muted-400"
              >Fill in the required fields</BaseText
            >
          </div>

          <div class="col-span-12 space-y-10 ltablet:col-span-9 lg:col-span-9">
            <FormGroup
              label="General info"
              sublabel="Some general information"
            >
            <builder-form-generator
              :schema="schema"
              @updated_form="updated_form"
      @submitted_form="submit_form(data)"
            >
              <template #form_bottom="{ onButtonClick }">
                <div class="mt-6">
                  <div class="block w-full rounded-md shadow-sm">
                    <BaseButton
                      type="submit"
                      shape="curved"
                      color="primary"
                      class="!h-11 w-full mt-2"
                      @click="onButtonClick"
                    >
                     Submit
                    </BaseButton>
                  </div>
                </div>
              </template>
            </builder-form-generator>
            </FormGroup>

        

           
          </div>
        </div>
      </BaseCard>
    </div>
    <div class="col-span-12 ltablet:col-span-4 lg:col-span-4">
      <BaseCard class="p-6 ptablet:p-8 lg:p-8">
        <BaseText
          size="xs"
          weight="medium"
          class="block mb-6 tracking-wider uppercase text-muted-400"
          >Record preview</BaseText
        >
        <div class="flex mb-4">
          <div class="grow">
            <BaseHeading as="h3" weight="medium"
              >{{ value.name }}
            </BaseHeading>
            <BaseText size="sm" class="text-muted-400"
              >{{ value.type
              }}</BaseText
            >
          </div>
          <div class="shrink-0">
            <BaseAvatar size="lg" src="img/games/snake_logo_sm.png" />
          </div>
        </div>
        <div>
          <BaseHeading as="h3" size="md" weight="medium">{{
            value.speciality
          }}</BaseHeading>
          <BaseText size="sm" class="text-muted-400">
            {{
              value?.description
            }}
          </BaseText>
        </div>
        <div
          class="flex items-center w-full py-6 divide-x divide-muted-200 dark:divide-muted-700"
        >
          <div class="flex flex-col flex-1 gap-1 xxl:pe-6 pe-4">
            <BaseHeading as="h3" size="sm" weight="medium" lead="none">{{
              value.status
            }}</BaseHeading>
            <BaseText size="xs" class="text-muted-400"> Role status </BaseText>
          </div>
          <div class="flex flex-col flex-1 gap-1 px-4 xxl:px-6">
            <BaseHeading as="h3" size="sm" weight="medium" lead="none">{{
              value.experience
            }}</BaseHeading>
            <BaseText size="xs" class="text-muted-400">
              Years of exp.
            </BaseText>
          </div>
          <div class="flex flex-col flex-1 gap-1 xxl:ps-6 ps-4">
            <BaseHeading as="h3" size="sm" weight="medium" lead="none"
              >Lvl.
              {{
                value.rating
              }}</BaseHeading
            >
            <BaseText size="xs" class="text-muted-400">
              Global rating
            </BaseText>
          </div>
        </div>
        <div>
          <div class="flex items-end justify-between">
            <div class="w-24 text-xs leading-tight uppercase">Tile Count</div>
            <div class="font-sans text-xs font-semibold text-success-600">
              {{ value.tile_count }}
            </div>
          </div>
          <div class="flex mt-1">
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                value.tile_count > 0
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                value.tile_count >= 10
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                value.tile_count >= 20
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                currentRating >= 30
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                value.tile_count === 40
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-6 text-muted-400">
          <Icon name="lucide:mail" class="w-4 h-4" />
          <!-- <BaseText size="xs">{{
            values.doctor?.email === '' ? 'email address' : values.doctor?.email
          }}</BaseText> -->
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Field, useFieldError, useForm } from "vee-validate";
import { z } from "zod";
import type { Agency } from "@/types";
const props: any = withDefaults(
  defineProps<{
    selectedAgency?: Agency;
    isEditModal: boolean;
    split: boolean;
  }>(),
  {
    isEditModal: false,
    split: true,
    selectedAgency: () => {
      return {
        id: "",
        name: "",
        description: "",
        logo: "",
        banner: "",
        color: "",
        theme: "",
        settings: {
          isPublic: false,
          isPinned: false,
          isArchived: false,
          isDeleted: false,
        },
        categories: [],
        participants: [],
        status: "",
        files_folder: "",
        file_ids: [],
      };
    },
  }
);

const { contacts } = useCrm();
const { openAiModels, openAiTools, createLegion } = useLegions();
const { add, setDocu } = useFirebaseFirestore();
// This is the object that will contain the validation messages
const ONE_MB = 1000000;
const VALIDATION_TEXT = {
  NAME_REQUIRED: "Name can't be empty",
  STATUS_REQUIRED: "Pick a status",
  AVATAR_TOO_BIG: `Avatar size must be less than 1MB`,
};

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  logo: z.custom<File>((v) => v instanceof File).nullable(),
  banner: z.custom<File>((v) => v instanceof File).nullable(),
  agency: z.object({
    name: z.string().min(1, VALIDATION_TEXT.NAME_REQUIRED),
    rating: z.string().optional(),
    files_folder: z.string().optional(),
    description: z.string().optional(),
    file_ids: z.array(z.string()).optional(),
    color: z.string().optional(),
    theme: z.string().optional(),
    settings: z.object({
      isPublic: z.boolean().optional(),
      isPinned: z.boolean().optional(),
      isArchived: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    }),
    categories: z.array(z.string()).optional(),
    participants: z.array(z.string()).optional(),
    status: z.string().optional(),
  }),
});

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>;

const validationSchema = toTypedSchema(zodSchema);
const initialValues = computed<FormInput>(() => ({
  logo: null,
  banner: null,
  agency: {
    name: props.selectedAgency?.name || "",
    rating: props.selectedAgency?.rating || 1,
    files_folder: props.selectedAgency?.files_folder || "",
    description: props.selectedAgency?.description || "",
    file_ids: props.selectedAgency?.file_ids || [],
    color: props.selectedAgency?.color || "",
    theme: props.selectedAgency?.theme || "",
    settings: {
      isPublic: props.selectedAgency?.settings?.isPublic || false,
      isPinned: props.selectedAgency?.settings?.isPinned || false,
      isArchived: props.selectedAgency?.settings?.isArchived || false,
      isDeleted: props.selectedAgency?.settings?.isDeleted || false,
    },
    categories: props.selectedAgency?.categories || [],
    participants: props.selectedAgency?.participants || [],
    status: props.selectedAgency?.status || "",
  },
}));

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
  meta,
  values,
  errors,
  resetForm,
  setFieldValue,
  setErrors,
} = useForm({
  validationSchema,
  initialValues,
});

const success = ref(false);
const fieldsWithErrors = computed(() => Object.keys(errors.value).length);

// BaseInputFileHeadless gives us a listfile input, but we need to
// extract the file from the list and set it to the form
const inputFile = ref<FileList | null>();
const fileError = useFieldError("avatar");
watch(inputFile, (value) => {
  const file = value?.item(0) || null;
  setFieldValue("avatar", file);
});

// Ask the user for confirmation before leaving the page if the form has unsaved changes
onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    return confirm("You have unsaved changes. Are you sure you want to leave?");
  }
});

const toaster = useToaster();
// This is where you would send the form data to the server
const onSubmit = handleSubmit(
  async (values: any) => {
    success.value = false;
    // here you have access to the validated form values
    try {
      // fake delay, this will make isSubmitting value to be true
      values.agency.avatar = currentAvatar.value;

      console.log("values", values.agency);

      values.agency.tools = tools.value;
      console.log("values", values.agency);

      // let legion = await createLegion(values.agency)
      console.log("legion!!!", legion);

      let data: any = {};
      if (props.isEditModal) {
        let payload = { ...props.selectedAgency, ...values.agency };
        data = await setDocu("agency", props.selectedAgency.id, payload);
      } else {
        data = await add("agency", values.agency, ...legion);
      }
      contacts.value.push(data);

      toaster.clearAll();
      toaster.show({
        title: "Success",
        message: `agency has been added!`,
        color: "success",
        icon: "ph:check",
        closable: true,
      });
    } catch (error: any) {
      console.log("error", error);
      // this will set the error on the form
      if (error.message === "Fake backend validation error") {
        // @ts-expect-error - vee validate typing bug with nested keys
        setFieldError("agency.speciality", "We have too many cardiologists");

        document.documentElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        toaster.clearAll();
        toaster.show({
          title: "Oops!",
          message: "Please review the errors in the form",
          color: "danger",
          icon: "lucide:alert-triangle",
          closable: true,
        });
      }
      return;
    }

    resetForm();

    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    success.value = true;
    setTimeout(() => {
      success.value = false;
    }, 3000);
  },
  (error: any) => {
    // this callback is optional and called only if the form has errors
    success.value = false;
    console.log("ERROR", error);
    // here you have access to the error
    for (let i = 0; i < error.errors.length; i++) {
      let err = error.errors[i];
      setFieldError(err.field, err.message);
    }

    // you can use it to scroll to the first error
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
);

const currentRating: any = computed(() => {
  if (values.agency?.rating === undefined || values.agency?.rating === null)
    return 0;
  return parseInt(values.agency?.rating);
});

const currentRatingText: any = computed(() => {
  switch (currentRating.value) {
    case 1:
      return "Standard";
    case 2:
      return "Good";
    case 3:
      return "Advanced";
    case 4:
      return "Expert";
    case 5:
      return "Top 3%";
    default:
      return "n/a";
  }
});
const currentAvatar: any = ref("/img/avatars/20.svg");

const isOpen: any = ref(false);

const selected = (img: any) => {
  currentAvatar.value = img[img.length - 1].src;
};
const tools = ref([]);
</script>

<template>
  <form
    action=""
    method="POST"
    @submit.prevent="onSubmit"
    class="grid grid-cols-12 gap-6"
  >
    <div
      class="flex flex-col justify-between col-span-12 mb-4 md:flex-row md:items-center"
    >
      <div
        class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full"
      >
        <Modal
          :open="isOpen"
          size="xl"
          footer-align="center"
          @close="isOpen = false"
        >
          <div class="h-screen p-4 overflow-auto">
            <file-manager @input="selected" />
          </div>
        </Modal>
        <div>
          <BaseHeading
            as="h2"
            size="xl"
            weight="light"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>{{ !isEditModal ? "New legion" : "Update legion" }}</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"
              >{{ isEditModal ? "Update" : "Create a new" }} legion records
            </span>
          </BaseParagraph>
        </div>
      </div>
      <div
        class="flex items-center justify-center gap-2 mt-4 md:mt-0 md:justify-start"
      >
        <BaseButtonAction @click.prevent="$emit('close')">
          <Icon name="lucide:arrow-left" class="w-3 h-3" />
          <span>Cancel</span>
        </BaseButtonAction>
      </div>
    </div>
    <div
      :class="{
        'ltablet:col-span-8 col-span-12 lg:col-span-8': split,
        'col-span-12': !split,
      }"
    >
      <BaseCard shape="rounded" class="p-4 md:p-8">
        <FormGroup
          label="Profile picture"
          sublabel="This is how others will recognize you"
        >
          <div class="flex justify-between w-full">
            <div class="relative flex flex-col items-center gap-4">
              <div class="relative w-24 h-24">
                <img
                  :src="currentAvatar"
                  alt="Upload preview"
                  class="object-cover object-center w-24 h-24 rounded-full bg-muted-200 dark:bg-muted-700/60"
                />

                <div class="absolute bottom-0 z-20 end-0">
                  <div class="relative" data-tooltip="Upload image">
                    <BaseButtonIcon
                      condensed
                      shape="full"
                      @click="isOpen = !isOpen"
                    >
                      <Icon name="lucide:plus" class="w-4 h-4" />
                    </BaseButtonIcon>
                  </div>
                </div>
              </div>

              <div
                v-if="fileError"
                class="text-danger-600 inline-block font-sans text-[.8rem]"
              >
                {{ fileError }}
              </div>
            </div>

            <div class="text-right md:col-span-5">
              <div
                class="inline-flex items-center justify-end w-full gap-2 -mt-12 sm:w-auto"
              >
                <BaseButton class="!h-8 w-full sm:w-32"> Cancel </BaseButton>
                <BaseButton
                  type="submit"
                  color="primary"
                  class="!h-8 w-full sm:w-32"
                >
                  Submit
                </BaseButton>
              </div>
            </div>
          </div>
        </FormGroup>
        <div class="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-12">
          <div class="col-span-12 space-y-10 ltablet:col-span-9 lg:col-span-9">
            <FormGroup label="General info" sublabel="Some general information">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.name"
                  >
                    <BaseInput
                      label="Name"
                      icon="ph:user-duotone"
                      placeholder="Ex: John the Warrior"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.description"
                  >
                    <BaseInput
                      label="Role"
                      icon="ph:user-duotone"
                      placeholder="Ex: Weather Assistant"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.model"
                  >
                    <BaseSelect
                      label="Model"
                      icon="fluent:text-position-through-24-regular"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    >
                      <option value="" hidden></option>
                      <option
                        v-for="(pos, index) in openAiModels"
                        :key="index"
                        :value="pos"
                      >
                        {{ pos }}
                      </option>
                    </BaseSelect>
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.rating"
                  >
                    <BaseSelect
                      label="Rating"
                      icon="ph:star-duotone"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="true"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    >
                      <option value="" hidden></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </BaseSelect>
                  </Field>
                </div>

                <div class="col-span-12">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.instructions"
                  >
                    <BaseTextarea
                      label="Instructions"
                      placeholder="Ex: You are a weather bot. Use the provided functions to answer questions."
                      rows="3"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>
                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.asAgent"
                  >
                    <BaseCheckboxHeadless
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    >
                      <BaseCard
                        shape="rounded"
                        class="peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 opacity-50 peer-checked:opacity-100"
                      >
                        <div class="flex items-center w-full gap-2">
                          <BaseAvatar src="/img/avatars/10.svg" />

                          <div>
                            <BaseHeading
                              as="h4"
                              size="sm"
                              weight="medium"
                              lead="none"
                            >
                              As Agent
                            </BaseHeading>

                            <BaseText size="xs" class="text-muted-400"
                              >Software Engineer</BaseText
                            >
                          </div>

                          <div class="child text-muted-300 ms-auto">
                            <div class="w-3 h-3 bg-current rounded-full"></div>
                          </div>
                        </div>
                      </BaseCard>
                    </BaseCheckboxHeadless>
                  </Field>
                </div>
                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="agency.isCEO"
                  >
                    <BaseCheckboxHeadless
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    >
                      <BaseCard
                        shape="rounded"
                        class="peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 opacity-50 peer-checked:opacity-100"
                      >
                        <div class="flex items-center w-full gap-2">
                          <BaseAvatar src="/img/avatars/10.svg" />

                          <div>
                            <BaseHeading
                              as="h4"
                              size="sm"
                              weight="medium"
                              lead="none"
                            >
                              Kendra Wilson
                            </BaseHeading>

                            <BaseText size="xs" class="text-muted-400"
                              >Software Engineer</BaseText
                            >
                          </div>

                          <div class="child text-muted-300 ms-auto">
                            <div class="w-3 h-3 bg-current rounded-full"></div>
                          </div>
                        </div>
                      </BaseCard>
                    </BaseCheckboxHeadless>
                  </Field>
                </div>
              </div>
            </FormGroup>
            <FormGroup label="Tools" sublabel="Choose the Tools that will help">
              <div class="col-span-12 md:col-span-12">
                <div class="grid grid-cols-2 gap-2">
                  <BaseCheckboxHeadless
                    v-for="(pos, index) in openAiTools"
                    :key="index"
                    :value="pos.value"
                    v-model="tools"
                  >
                    <BaseCard
                      shape="rounded"
                      class="peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 opacity-50 peer-checked:opacity-100"
                    >
                      <div class="flex items-center w-full gap-2">
                        <BaseAvatar :src="pos.avatar" />

                        <div>
                          <BaseHeading
                            as="h4"
                            size="sm"
                            weight="medium"
                            lead="none"
                          >
                            {{ pos.title }}
                          </BaseHeading>

                          <BaseText size="xs" class="text-muted-400">{{
                            pos.description
                          }}</BaseText>
                        </div>

                        <div class="child text-muted-300 ms-auto">
                          <div class="w-3 h-3 bg-current rounded-full"></div>
                        </div>
                      </div>
                    </BaseCard>
                  </BaseCheckboxHeadless>
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
      </BaseCard>
    </div>
    <div
      :class="{
        'ltablet:col-span-4 col-span-12 lg:col-span-4': split,
        'col-span-12': !split,
      }"
    >
      <BaseCard class="p-6 ptablet:p-8 lg:p-8">
        <BaseText
          size="xs"
          weight="medium"
          class="block mb-6 tracking-wider uppercase text-muted-400"
          >Record preview</BaseText
        >
        <div class="flex mb-4">
          <div class="grow">
            <BaseHeading as="h3" weight="medium" class="flex">
              <div v-if="values.agency?.title" class="space-x-1">.</div>
              {{ values.agency?.name }}
            </BaseHeading>
            <BaseText size="sm" class="text-muted-400"
              >{{
                values.agency?.role === null
                  ? "Role will be shown here"
                  : values.agency?.role
              }},
            </BaseText>
          </div>
          <div class="shrink-0">
            <BaseAvatar size="lg" :src="currentAvatar" />
          </div>
        </div>
        <div>
          <BaseHeading as="h3" size="md" weight="medium">{{
            values.agency?.speciality === null
              ? "Main speciality"
              : values.agency?.speciality
          }}</BaseHeading>
          <BaseText size="sm" class="text-muted-400">
            {{
              values.agency?.comments === ""
                ? "Observations will be shown here"
                : values.agency?.comments
            }}
          </BaseText>
        </div>
        <div
          class="flex items-center w-full py-6 divide-x divide-muted-200 dark:divide-muted-700"
        >
          <div class="flex flex-col flex-1 gap-1 xxl:pe-6 pe-4">
            <BaseHeading as="h3" size="sm" weight="medium" lead="none">{{
              values.agency?.status === null ? "n/a" : values.agency?.status
            }}</BaseHeading>
            <BaseText size="xs" class="text-muted-400"> Role status </BaseText>
          </div>
          <div class="flex flex-col flex-1 gap-1 px-4 xxl:px-6">
            <BaseHeading as="h3" size="sm" weight="medium" lead="none">{{
              values.agency?.experience === null
                ? "n/a"
                : values.agency?.experience
            }}</BaseHeading>
            <BaseText size="xs" class="text-muted-400">
              Years of exp.
            </BaseText>
          </div>
          <div class="flex flex-col flex-1 gap-1 xxl:ps-6 ps-4">
            <BaseHeading as="h3" size="sm" weight="medium" lead="none"
              >Lvl.
              {{
                values.agency?.rating === null ? "n/a" : values.agency?.rating
              }}</BaseHeading
            >
            <BaseText size="xs" class="text-muted-400">
              Global rating
            </BaseText>
          </div>
        </div>
        <div>
          <div class="flex items-end justify-between">
            <div class="w-24 text-xs leading-tight uppercase">Rating</div>
            <div class="font-sans text-xs font-semibold text-success-600">
              {{ currentRatingText }}
            </div>
          </div>
          <div class="flex mt-1">
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                currentRating > 0
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                currentRating >= 2
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                currentRating >= 3
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                currentRating >= 4
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
            <div
              class="h-3 border-white dark:border-muted-800 grow border-x"
              :class="
                currentRating === 5
                  ? 'bg-success-600'
                  : 'bg-muted-200 dark:bg-muted-700'
              "
            ></div>
          </div>
        </div>
      </BaseCard>
    </div>
    <FormSave
      :disabled="isSubmitting"
      :loading="isSubmitting"
      @reset="resetForm"
    />
  </form>
</template>

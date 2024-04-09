<script setup lang="ts">
const props: any = withDefaults(
  defineProps<{
    selectedFolder?: object
    isEditModal: boolean
    selectedFolderIndex: number
  }>(),
  {
    isEditModal: false,
    selectedFolder: () => {
      return {
        title: '',
        shortDesc: '',
        tags: [],
        type: 'Folder',
      }
    },
  },
)
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

const { setDocu, add } = useFirebaseFirestore()

const VALIDATION_TEXT = {
  TITLE_REQUIRED: 'Folder name is required',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  event: z.object({
    title: z.string().min(2, VALIDATION_TEXT.TITLE_REQUIRED),
    shortDesc: z.string(),
    type: z.string(),
    tags: z.array(z.string()).optional(),
  }),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  event: {
    title: props.isEditModal ? props.selectedFolder.title : '',
    shortDesc: props.isEditModal ? props.selectedFolder.shortDesc : '',
    type: 'folder',
    tags: [],
  },
}))

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
})

const tags = ref([])
const success = ref(false)
const fieldsWithErrors = computed(() => Object.keys(errors.value).length)

// Ask the user for confirmation before leaving the page if the form has unsaved changes
onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    return confirm('You have unsaved changes. Are you sure you want to leave?')
  }
})

const toaster = useToaster()
const em: any = getCurrentInstance()
// This is where you would send the form data to the server
const onSubmit = handleSubmit(
  async (values) => {
    success.value = false
    values.event.tags = tags.value
    values.event.type = 'folder'

    // here you have access to the validated form values
    try {
      let data = {}

      if (props.isEditModal) {
        data = await setDocu('folders', props.selectedFolder.id, values.event)
      } else {
        data = await add('folders', values.event)
      }

      toaster.clearAll()
      toaster.show({
        title: 'Success',
        message: `Record has been created!`,
        color: 'success',
        icon: 'ph:check',
        closable: true,
      })
      let emitData: any = {
        ...values.event,
        ...data,
      }
      em.emit('created', emitData)
      em.emit('close')
    } catch (error: any) {
      // this will set the error on the form
      if (error.message === 'Fake backend validation error') {
        // @ts-expect-error - vee validate typing bug with nested keys
        setFieldError('event.title', 'This name is not allowed')

        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        toaster.clearAll()
        toaster.show({
          title: 'Oops!',
          message: 'Please review the errors in the form',
          color: 'danger',
          icon: 'lucide:alert-triangle',
          closable: true,
        })
      }
      return
    }

    resetForm()

    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    success.value = true
    setTimeout(() => {
      success.value = false
    }, 3000)
  },
  (error) => {
    // this callback is optional and called only if the form has errors
    success.value = false

    // here you have access to the error
    console.log('event-create-error', error)

    // you can use it to scroll to the first error
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  },
)
</script>

<template>
  <form
    action=""
    method="POST"
    @submit.prevent="onSubmit"
    class="relative py-3 sm:mx-auto sm:max-w-xl"
  >
    <BaseCard shape="curved" class="relative px-4 py-10 sm:p-10 md:mx-0">
      <div class="mx-auto max-w-md">
        <div class="flex items-center gap-4">
          <div
            class="bg-primary-500/20 text-primary-500 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-2xl"
          >
            <Icon name="ph:calendar-blank-duotone" class="h-5 w-5" />
          </div>
          <div class="block text-xl font-semibold text-gray-700">
            <BaseHeading as="h3" size="lg" weight="medium">
              Create an Folder
            </BaseHeading>
            <BaseText size="sm" class="text-muted-400"
              >Create a folder to organize your media.</BaseText
            >
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div class="grid grid-cols-12 gap-4 py-8">
            <div class="col-span-12">
              <Field
                v-slot="{ field, errorMessage, handleChange, handleBlur }"
                name="event.title"
              >
                <BaseInput
                  label="Title"
                  shape="curved"
                  icon="ph:ticket-duotone"
                  placeholder="Ex: Company Files"
                  :classes="{
                    input: '!h-11 !ps-11',
                    icon: '!h-11 !w-11',
                  }"
                  :model-value="field.value"
                  :error="errorMessage"
                  :disabled="isSubmitting"
                  type="text"
                  @update:model-value="handleChange"
                  @blur="handleBlur"
                />
              </Field>
            </div>
            <div class="col-span-12">
              <Field
                v-slot="{ field, errorMessage, handleChange, handleBlur }"
                name="event.shortDesc"
              >
                <BaseInput
                  label="Short description"
                  shape="curved"
                  icon="ph:circles-four-duotone"
                  placeholder="Ex: We will meet to have fun together"
                  :classes="{
                    input: '!h-11 !ps-11',
                    icon: '!h-11 !w-11',
                  }"
                  :model-value="field.value"
                  :error="errorMessage"
                  :disabled="isSubmitting"
                  type="text"
                  @update:model-value="handleChange"
                  @blur="handleBlur"
                />
              </Field>
            </div>
            <div class="col-span-12">
              <BaseTags
                title="tags"
                icon="gis:tags"
                shape="curved"
                @created="tags = $event"
              />
            </div>
          </div>
          <div class="flex items-center gap-4 pt-4">
            <BaseButton
              @click="$emit('close')"
              shape="curved"
              class="!h-12 w-full"
              >Cancel</BaseButton
            >
            <BaseButton
              type="submit"
              shape="curved"
              color="primary"
              class="!h-12 w-full"
              >Create</BaseButton
            >
          </div>
        </div>
      </div>
    </BaseCard>
  </form>
</template>

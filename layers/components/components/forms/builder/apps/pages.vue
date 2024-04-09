<script setup lang="ts">
const props: any = withDefaults(
  defineProps<{
    schema: {
      rules: any;
      superRefine: any;
      fields: {
        label: string;
        name: string;
        as: string;
        type: string;
        children?: any;
      }[];
    };
  }>(),
  {
    schema: () => {
      return {
        rules: [],
        superRefine: [],
        fields: [],
      };
    },
  }
);
const emit = defineEmits(["submit"]);
const submit_form = async (data: any) => {
  emit("submit", data);
};
</script>

<template>
  <div class="flex min-h-screen bg-white dark:bg-muted-800">
    <div
      class="relative items-center justify-center flex-1 hidden w-0 bg-muted-100 dark:bg-muted-900 lg:flex lg:w-3/5"
    >
      <div
        class="flex items-center justify-center w-full h-full max-w-4xl mx-auto"
      >
        <!--Media image-->
        <img
          class="max-w-xl mx-auto"
          src="/img/illustrations/station.svg"
          alt=""
          width="619"
          height="594"
        />
      </div>
    </div>
    <div
      class="relative flex flex-col justify-center flex-1 px-6 py-12 lg:w-2/5 lg:flex-none"
    >
      <div class="relative w-full max-w-sm mx-auto bg-white dark:bg-muted-800">
        <!--Nav-->
        <div class="flex items-center justify-between w-full">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 font-sans font-medium transition-colors duration-300 text-muted-400 hover:text-primary-500"
          >
            <Icon name="gg:arrow-long-left" class="w-5 h-5" />
            <span>Back to Application</span>
          </NuxtLink>
          <!--Theme button-->
          <BaseThemeToggle />
        </div>
        <div>
          <BaseHeading
            as="h2"
            size="3xl"
            lead="relaxed"
            weight="medium"
            class="mt-6"
          >
            Create an page
          </BaseHeading>
          <BaseParagraph size="sm" class="mb-6 text-muted-400">
            Let's get started by creating a new page.
          </BaseParagraph>
          <!-- <div class="flex flex-wrap justify-between gap-4">
            <button
              class="relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border dark:bg-muted-700 text-muted-800 border-muted-300 dark:border-muted-600 nui-focus grow rounded-xl dark:text-white"
            >
              <Icon name="logos:google-icon" class="w-5 h-5" />
              <div>Login with Google</div>
            </button>
            <button
              class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus w-[calc(50%_-_0.5rem)] cursor-pointer rounded-xl px-5 py-4 text-center transition-colors duration-300 md:w-auto"
            >
              <Icon name="fa6-brands:twitter" class="w-4 h-4 mx-auto" />
            </button>
            <button
              class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus w-[calc(50%_-_0.5rem)] cursor-pointer rounded-xl px-5 py-4 text-center transition-colors duration-300 md:w-auto"
            >
              <Icon name="fa6-brands:linkedin-in" class="w-4 h-4 mx-auto" />
            </button>
          </div> -->
          <div class="flex items-center mt-8 flex-100">
            <hr
              class="flex-auto border-t-2 border-muted-200 dark:border-muted-700"
            />
            <span class="px-4 font-sans font-light text-muted-400">
              Page Create
            </span>
            <hr
              class="flex-auto border-t-2 border-muted-200 dark:border-muted-700"
            />
          </div>
        </div>

        <!--Form section-->
        <div class="mt-6">
          <div class="mt-5">
            <builder-form-generator
              :schema="schema"
              @submitted_form="submit_form"
            >
              <template #form_bottom="{ onButtonClick }">
                <div class="flex items-center justify-between mt-6">
                  <!-- <Field
                    v-slot="{ field, handleChange, handleBlur }"
                    name="trust_device"
                  >
                    <BaseCheckbox
                      :model-value="field.value"
                      :disabled="isSubmitting"
                      shape="curved"
                      label="Trust for 60 days"
                      color="primary"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field> -->
                  <div></div>

                  <!-- <div class="text-xs leading-5">
                    <NuxtLink
                      to="/auth/recover"
                      class="font-sans font-medium transition duration-150 ease-in-out text-primary-600 hover:text-primary-500 underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </NuxtLink>
                  </div> -->
                </div>
                <div class="mt-6">
                  <div class="block w-full rounded-md shadow-sm">
                    <BaseButton
                      type="submit"
                      shape="curved"
                      color="primary"
                      class="!h-11 w-full mt-2"
                      @click="onButtonClick"
                    >
                      Create Page
                    </BaseButton>
                  </div>
                </div>
              </template>
            </builder-form-generator>

            <!--No account link-->
            <!-- <p
              class="flex justify-between mt-4 font-sans text-xs leading-5 text-muted-400"
            >
              <span>Don't have an account?</span>
              <NuxtLink
                to="/auth/register"
                class="font-medium transition duration-150 ease-in-out text-primary-600 hover:text-primary-500 underline-offset-4 hover:underline"
              >
                start your 14-day free trial
              </NuxtLink>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

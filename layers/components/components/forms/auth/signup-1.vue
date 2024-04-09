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
  <div class="h-screen md:flex">
    <div
      class="relative items-center justify-around hidden w-1/2 overflow-hidden from-primary-900 to-primary-500 i group bg-gradient-to-tr md:flex"
    >
      <div class="max-w-xs mx-auto text-center">
        <BaseHeading as="h2" size="3xl" weight="medium" class="text-white">
          Have an Account?
        </BaseHeading>
        <BaseParagraph size="sm" class="mb-3 text-muted-200">
          No need to waste time on this page, let's take you back to your
          account
        </BaseParagraph>
        <BaseButton to="/auth/login" shape="curved" class="w-full"
          >Login to Account</BaseButton
        >
      </div>
      <div
        class="bg-muted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72"
      ></div>
      <div
        class="absolute w-0 transition-all duration-300 delay-75 origin-top-left rotate-45 rounded-full bg-muted-200/20 -top-12 start-20 h-14 group-hover:w-48"
      ></div>
      <div
        class="absolute w-0 transition-all duration-300 delay-150 origin-top-left rotate-45 rounded-full bg-muted-200/20 -start-7 top-24 h-14 group-hover:w-40"
      ></div>

      <div
        class="absolute w-0 transition-all duration-300 delay-150 origin-bottom-right rotate-45 rounded-full bg-muted-200/20 -bottom-6 -end-6 h-14 group-hover:w-72"
      ></div>
      <div
        class="absolute w-0 transition-all duration-300 delay-75 origin-bottom-right rotate-45 rounded-full bg-muted-200/20 -bottom-12 end-20 h-14 group-hover:w-48"
      ></div>
      <div
        class="bg-muted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40"
      ></div>
    </div>
    <div
      class="flex flex-col items-center justify-between py-10 bg-white dark:bg-muted-900 md:w-1/2"
    >
      <div class="flex items-center justify-between w-full max-w-xs mx-auto">
        <NuxtLink
          to="/"
          class="transition-colors duration-300 text-muted-400 hover:text-primary-500 dark:text-muted-700 dark:hover:text-primary-500"
        >
          <Logo class="w-10 h-10" />
        </NuxtLink>
        <div>
          <BaseThemeToggle />
        </div>
      </div>
      <div class="w-full max-w-xs mx-auto">
        <BaseHeading as="h2" size="3xl" weight="medium">
          Welcome to Tairo
        </BaseHeading>
        <BaseParagraph size="sm" class="mb-6 text-muted-400">
          Let's start by creating you account
        </BaseParagraph>

        <div class="mb-4 space-y-3">
          <builder-form-generator
            :schema="schema"
            @submitted_form="submit_form"
          >
            <template #form_bottom="{ onButtonClick }">
              <BaseButton
                type="submit"
                shape="curved"
                color="primary"
                class="!h-11 w-full mt-2"
                @click="onButtonClick"
              >
                Create Account
              </BaseButton>
            </template>
          </builder-form-generator>
        </div>

        <!--No account link-->
        <p
          class="flex justify-between mt-4 font-sans text-sm leading-5 text-muted-400"
        >
          <span>Have an account?</span>
          <NuxtLink
            to="/auth/login"
            class="font-medium transition duration-150 ease-in-out text-primary-600 hover:text-primary-500 underline-offset-4 hover:underline focus:underline focus:outline-none"
          >
            Login here
          </NuxtLink>
        </p>
      </div>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400">
          © {{ new Date().getFullYear() }} Tairo. All rights reserved.
        </BaseText>
      </div>
    </div>
  </div>
</template>

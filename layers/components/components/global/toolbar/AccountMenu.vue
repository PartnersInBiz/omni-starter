<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
const { user } = useAccount();
const router = useRouter();
const logout = () => {
  // logout logic
  user.value = {
    name: "",
    surname: "",
    logo: "",
    email: "",
    phone: "",
    username: "",
    accounts: [],
    aliases: [],
    createdAt: "",
    updatedAt: "",
    status: "",
    active: true,
  };
  router.push("/auth/login");
};
</script>

<template>
  <div class="inline-flex items-center justify-center text-right group">
    <Menu as="div" class="relative text-left h-9 w-9" v-slot="{ close }">
      <MenuButton as="template">
        <button
          type="button"
          class="inline-flex items-center justify-center transition-all duration-300 rounded-full group-hover:ring-primary-500 dark:ring-offset-muted-900 h-9 w-9 ring-1 ring-transparent group-hover:ring-offset-4"
        >
          <div
            class="relative inline-flex items-center justify-center rounded-full h-9 w-9"
          >
            <img
              src="/img/avatars/2.svg"
              class="object-cover max-w-full rounded-full shadow-sm dark:border-transparent"
              alt=""
            />
          </div>
        </button>
      </MenuButton>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute w-64 mt-2 origin-top-right bg-white border divide-y rounded-md shadow-lg divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 end-0 focus:outline-none"
        >
          <div class="p-6 text-center">
            <div
              class="relative flex items-center justify-center w-20 h-20 mx-auto rounded-full"
            >
              <img
                src="/img/avatars/2.svg"
                class="object-cover max-w-full rounded-full shadow-sm dark:border-transparent"
                alt=""
              />
            </div>
            <div class="mt-3">
              <h6
                class="text-sm font-medium font-heading text-muted-800 dark:text-white"
              >
                Maya Rosselini
              </h6>
              <p class="mb-4 font-sans text-xs text-muted-400">maya@tairo.io</p>
              <BaseButton
                to="/layouts/profile-edit"
                shape="curved"
                class="w-full"
                @click.passive="close"
                >Manage Account</BaseButton
              >
            </div>
          </div>
          <div class="px-6 py-1.5">
            <MenuItem as="div" v-slot="{ active }">
              <NuxtLink
                to="#"
                class="flex items-center w-full p-2 text-sm transition-colors duration-300 rounded-md group"
                :class="[
                  active
                    ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                    : 'text-muted-500',
                ]"
                @click.passive="close"
              >
                <div
                  class="relative inline-flex items-center justify-center rounded-full h-9 w-9"
                >
                  <img
                    src="/img/avatars/3.svg"
                    class="object-cover max-w-full rounded-full shadow-sm dark:border-transparent"
                    alt=""
                  />
                </div>
                <div class="ms-2">
                  <h6
                    class="text-xs font-medium leading-none font-heading text-muted-800 dark:text-white"
                  >
                    Mike Miller
                  </h6>
                  <p class="font-sans text-xs text-muted-400">mike@tairo.io</p>
                </div>
              </NuxtLink>
            </MenuItem>
            <MenuItem as="div" v-slot="{ active }">
              <NuxtLink
                to="#"
                class="flex items-center w-full p-2 text-sm transition-colors duration-300 rounded-md group"
                :class="[
                  active
                    ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                    : 'text-muted-500',
                ]"
                @click.passive="close"
              >
                <div
                  class="relative inline-flex items-center justify-center rounded-full h-9 w-9"
                >
                  <img
                    src="/img/avatars/9.svg"
                    class="object-cover max-w-full rounded-full shadow-sm dark:border-transparent"
                    alt=""
                  />
                </div>
                <div class="ms-2">
                  <h6
                    class="text-xs font-medium leading-none font-heading text-muted-800 dark:text-white"
                  >
                    Claire Baker
                  </h6>
                  <p class="font-sans text-xs text-muted-400">
                    claire@tairo.io
                  </p>
                </div>
              </NuxtLink>
            </MenuItem>
            <MenuItem as="div" v-slot="{ active }">
              <NuxtLink
                to="#"
                class="flex items-center w-full p-2 text-sm transition-colors duration-300 rounded-md group"
                :class="[
                  active
                    ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                    : 'text-muted-500',
                ]"
                @click.passive="close"
              >
                <div
                  class="relative inline-flex items-center justify-center rounded-full h-9 w-9"
                >
                  <img
                    src="/img/avatars/14.svg"
                    class="object-cover max-w-full rounded-full shadow-sm dark:border-transparent"
                    alt=""
                  />
                </div>
                <div class="ms-2">
                  <h6
                    class="text-xs font-medium leading-none font-heading text-muted-800 dark:text-white"
                  >
                    Alan Baxter
                  </h6>
                  <p class="font-sans text-xs text-muted-400">alan@tairo.io</p>
                </div>
              </NuxtLink>
            </MenuItem>
          </div>

          <div class="p-6">
            <BaseButton @click.passive="logout" shape="curved" class="w-full">
              Logout
            </BaseButton>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>

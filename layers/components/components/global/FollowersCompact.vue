<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    text?: string;
    followers: Array<{
      name: string;
    }>;
  }>(),
  {
    title: "Followers",
    subtitle: "Great News!",
    text: "Great News! Clarke, John and Maggie are now following you. Take some time to look at their profile.",
  }
);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <BaseHeading
        as="h3"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <span>{{ title }}</span>
      </BaseHeading>
      <BaseAvatarGroup :avatars="followers" size="xs" :limit="3" />
    </div>
    <div>
      <BaseParagraph size="xs">
        <span class="text-muted-400">
          {{ subtitle }}
          <NuxtLink
            v-for="(follower, index) in followers"
            :key="index"
            to="#"
            class="text-primary-500 underline-offset-2 hover:underline"
          >
            {{ follower.name }}
          </NuxtLink>
          ,
          <NuxtLink
            to="#"
            class="text-primary-500 underline-offset-2 hover:underline"
          >
            John
          </NuxtLink>
          and
          <NuxtLink
            to="#"
            class="text-primary-500 underline-offset-2 hover:underline"
          >
            Maggie
          </NuxtLink>
          {{ text }}
        </span>
      </BaseParagraph>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineProps<{
  avatar: string;
  badge: string;
  display_name: string;
  roles: Array<string>;
  id: string;
}>();
</script>

<template>
  <div class="relative">
    <BaseCard class="p-6" shape="curved">
      <div class="flex flex-col">
        <BaseAvatar
          size="xl"
          :src="avatar"
          :badge-src="badge"
          alt="Avatar"
          class="mx-auto mb-4"
        />
        <div class="text-center">
          <BaseHeading
            as="h4"
            size="md"
            weight="medium"
            lead="tight"
            class="text-muted-800 dark:text-muted-100"
          >
            <span>{{ display_name }}</span>
          </BaseHeading>
          <BaseParagraph size="xs" v-for="(role, index) in roles" :key="index">
            <span class="text-muted-400">{{ role }}</span>
          </BaseParagraph>
          <div class="mt-3">
            <BaseButton
              @click="$emit('view-profile', id)"
              shape="curved"
              color="default"
              class="w-full"
            >
              <span>View Profile</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
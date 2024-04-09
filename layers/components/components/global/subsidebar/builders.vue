<script setup lang="ts">
const navigation = [
  {
    name: 'Dashboard',
    to: '/builders/dashboard',
    icon: 'ph:coffee-duotone',
  },
  {
    name: 'Applications',
    children: [
      {
        name: 'Dashboard',
        icon: 'ph:coffee-duotone',
        to: '/builders/app/dashboard',
        exact: true,
      },
      {
        name: 'Create',
        icon: 'ph:cactus-duotone',
        to: '/builders/app/create',
      },
    ],
  },
  {
    name: 'Forms',
    children: [
      {
        name: 'Dashboard',
        icon: 'ph:coffee-duotone',
        to: '/builders/form/dashboard',
        exact: true,
      },
      {
        name: 'Create',
        icon: 'ph:cactus-duotone',
        to: '/builders/form/create',
      },
    ],
  },
]
</script>

<template>
  <Subsidebar>
    <template #header>
      <SubsidebarHeader />
    </template>

    <SubsidebarMenu :navigation="navigation" />
  </Subsidebar>
</template>

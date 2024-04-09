<script setup lang="ts">
const navigation = [
  {
    name: "Snake",
    children: [
      {
        name: "Practice",
        icon: "ph:coffee-duotone",
        to: "/games/snake",
        exact: true,
      },
      {
        name: "Dashboard",
        icon: "ph:chart-pie-slice-duotone",
        to: "/games/snake/dashboard",
      },
      {
        name: "Create Competition",
        icon: "ph:chart-pie-slice-duotone",
        to: "/games/snake/competition/create",
      },
    ],
  },

  {
    divider: true,
  },
];
</script>

<template>
  <Subsidebar>
    <template #header>
      <SubsidebarHeader />
    </template>

    <SubsidebarMenu :navigation="navigation" />
  </Subsidebar>
</template>

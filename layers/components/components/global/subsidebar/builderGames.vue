<script setup lang="ts">

const navigation = [
  {
    name: "HTML 5",
    subsidebarclean: [
      {
        name: "Snake",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderAppComponentsAddGamesSnake",
      },
    ]
  }

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

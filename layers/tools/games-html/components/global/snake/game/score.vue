<script>
const { score } = useSnake();
</script>

<template>
  <div class="game-score">
    <Icon name="fluent-emoji-flat:red-apple" :size="24" />
    {{ score }}
  </div>
</template>



<style scoped>
.game-score {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: 1.6rem;
  font-weight: 800;
  color: var(--col-food-apple);
}
</style>

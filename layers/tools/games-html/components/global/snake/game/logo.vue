<script setup lang='ts'>
</script>

<template>
  <div class="game-logo">
    <!-- <picture>
      <source srcset="/img/games/snake_logo_sm.webp" type="image/webp" />
      <source srcset="/img/games/snake_logo_sm.png" type="image/png" />
      <img
        class="game-logo-img"
        src="/img/games/snake_logo_sm.png"
        alt="Schlitterio Logo"
      />
    </picture> -->
    <div class="game-logo-text">
      <h1 class="game-logo-title">Loyalty</h1>
      <h2 class="game-logo-subtitle">Nom nom tasty apple!</h2>
    </div>
  </div>
</template>

<style scoped>
.game-logo {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.game-logo-img {
  display: block;
  width: 6rem;
}
.game-logo-text {
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-logo-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--col-prim);
}
.game-logo-subtitle {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--col-txt-sec);
}
</style>

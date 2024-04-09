
<script setup lang='ts'>
const {
  isSnake,
  isFood,
  randomOf,
  directions,
  tileCount,
  snake,
  food,
  isRunning,
  direction,
  score,
  highscores,
  lastPlayedScore,
} = useSnake();

const props = withDefaults(defineProps<{
  orientation?: string;
}>(), {
  orientation: 'end',
});

const { startGame, changeDirection, loadHighscores, handleKeydown } =
  useSnakeFunc();

onMounted(() => {
  loadHighscores();
  if (process.client) {
    window.addEventListener("keydown", handleKeydown);
  }
});
</script>

<template>
  <div class="game-container" :style="`--tile-count: ${tileCount};`">
    <SnakeGameLogo />

    <div class="game-gui">
      <div class="game-ctrl">
        <button class="btn btn-start" @click="startGame">Start</button>
        <SnakeGameScore :score="score.pts" />
      </div>

      <SnakeGameHighscoreList
        :highscores="highscores"
        :lastPlayedScore="lastPlayedScore"
      />
    </div>

    <SnakeGameBoard :tileCount="tileCount" :snake="snake" :food="food" />

    <div class="game-btn-wrapper">
      <button class="btn btn-ctrl" @click="changeDirection('left')">
        <Icon name="material-symbols:arrow-circle-left" :size="42" />
      </button>
      <button class="btn btn-ctrl" @click="changeDirection('right')">
        <Icon name="material-symbols:arrow-circle-right" :size="42" />
      </button>
    </div>
  </div>
</template>
  
  
<style scoped>
@font-face {
  font-family: "Inter";
  src: url("./fonts/inter.woff2") format("woff2"),
    url("./fonts/inter.woff") format("woff"),
    url("./fonts/inter.ttf") format("truetype");
}

/* Variables */
:root {
  --col-prim: #91dd2e;
  --col-sec: #37a35f;
  --col-food-apple: #e03131;
  --col-light-grey: #f3f3f3;
  --col-txt-prim: #ffffff;
  --col-txt-sec: #c0c0c0;
  --col-txt-dark: #444444;
}

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  touch-action: manipulation;
  user-select: none;
}
html {
  font-size: 62.5%;
  overflow: hidden;
}
body {
  background-color: var(--col-light-grey);
  font-family: "Inter", Fallback, sans-serif;
}

html,
body,
.game-container {
  height: 100dvh;
}

/* Layout */
.game-container {
  margin: auto;
  padding: 2rem;
  max-width: 70rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.game-container > * {
  min-width: 0;
}
.game-gui {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.game-ctrl {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.game-btn-wrapper {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn {
  background-color: var(--col-prim);
  border: 0;
  border-bottom: 0.5rem solid var(--col-sec);
  border-radius: 1rem;
  color: white;
}
.btn:focus-visible {
  outline: 0.25rem dashed var(--col-prim);
  outline-offset: 0.25rem;
}
.btn:active {
  border-bottom: 0.25rem solid var(--col-sec);
}
.btn-start {
  padding: 1rem 2rem;

  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
}
.btn-ctrl {
  width: 100%;
  padding: 1rem;
}

/* Media queries */
@media (max-width: 380px) {
  html {
    font-size: 50%;
  }
  .game-container {
    gap: 1rem;
  }
  .game-ctrl {
    flex-direction: row;
  }
}
</style>
  
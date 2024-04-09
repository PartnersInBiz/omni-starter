
<script setup lang='ts'>
const { history, stepNumber, status, current } = useTicTacToe();

const { updateStatus, onSquareSelection, moveTo } = useTicTacToeFunc();

onMounted(() => {
  setTimeout(() => {
    updateStatus();
  }, 1000);
});
</script>

<template>
  <div>
    <h1>Tic Tac Toe (Vue.js)</h1>
    <div class="game">
      <div class="game-board">
        <TictactoeBoard
          :squares="current.squares"
          @squareSelection="onSquareSelection"
        ></TictactoeBoard>
      </div>
      <div class="game-info">
        <div>{{ status }}</div>
        <TictactoeMoves
          :history="history"
          :currentStep="stepNumber"
          @move="moveTo(index)"
        ></TictactoeMoves>
      </div>
    </div>
  </div>
</template>
<style>
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol,
ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
</style>
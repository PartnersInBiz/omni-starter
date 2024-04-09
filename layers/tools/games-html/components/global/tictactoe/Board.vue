
<script setup lang='ts'>
const props = defineProps<{
  squares: any;
}>();
let em: any = getCurrentInstance();
const onSquareSelection = (event: any) => {
  em.emit("squareSelection", event);
};
</script>


<template>
  <div>
    <div class="board-row">
      <TictactoeSquare
        index="0"
        :value="squares[0]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
      <TictactoeSquare
        index="1"
        :value="squares[1]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
      <TictactoeSquare
        index="2"
        :value="squares[2]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
    </div>
    <div class="board-row">
      <TictactoeSquare
        index="3"
        :value="squares[3]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
      <TictactoeSquare
        index="4"
        :value="squares[4]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
      <TictactoeSquare
        index="5"
        :value="squares[5]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
    </div>
    <div class="board-row">
      <TictactoeSquare
        index="6"
        :value="squares[6]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
      <TictactoeSquare
        index="7"
        :value="squares[7]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
      <TictactoeSquare
        index="8"
        :value="squares[8]"
        @selection="onSquareSelection"
      ></TictactoeSquare>
    </div>
  </div>
</template>

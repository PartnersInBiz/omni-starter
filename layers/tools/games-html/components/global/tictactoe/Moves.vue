<script setup lang='ts'>
const props = defineProps<{
  history: any;
  currentStep: number;
}>();
let em: any = getCurrentInstance();
const moveTo = (move: any) => {
  em.emit("move", move);
};

const buttonCaption = (
  move: number,
  entry: { position: { row: any; col: any } | null }
) => {
  if (move === 0) {
    return `Go to game start`;
  }
  if (move > 0 && entry.position !== null) {
    return `Go to move #${move} 
        (Row: ${entry.position.row} Column: ${entry.position.col})`;
  }
};
const isCurrentStep = (move: number) => {
  return move === props.currentStep;
};
</script>

<template>
  <div>
    <h3>Moves</h3>
    <ul>
      <li v-for="(entry, move) in history" :key="move">
        <button
          @click="moveTo(move)"
          :class="{ highlight: isCurrentStep(move) }"
        >
          {{ buttonCaption(move, entry) }}
        </button>
      </li>
    </ul>
  </div>
</template>



<style scoped>
.highlight {
  font-weight: bold;
}
</style>


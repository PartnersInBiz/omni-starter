<script setup lang="ts">
const { snakeCompetitions, selectedSnakeCompetition, } = useSnake()
const { getSnakes } = useSnakeGetFunc()

onMounted(() => {
    getSnakes()
})
const goToSnake = (snake: any) => {
    selectedSnakeCompetition.value = snake
    useRouter().push('/games/snake/competition/dashboard')
}
</script>

<template>
  <div class="space-y-6 divide-y divide-muted-200 dark:divide-muted-700">
    <div
      v-for="(snake, index) in snakeCompetitions"
      :key="snake.id"
      class="flex flex-col gap-4 sm:flex-row"
      :class="index > 0 ? 'pt-6' : ''"
    >
      <BaseAvatar
        size="lg"
        :src="snake.avatar ? snake.avatar : '/img/games/snake/snake_logo_sm.png'"
        :text="snake.name"
        :data-nui-tooltip="snake.name"
      />
      <div class="max-w-md">
        <BaseHeading
          as="h3"
          size="md"
          weight="medium"
          class="mb-1 text-muted-800 dark:text-muted-100"
        >
          <span>[#{{ snake._additional.id }}] {{ snake.name }}</span>
        </BaseHeading>
        <BaseParagraph
          size="sm"
          class="mb-1 text-muted-500 dark:text-muted-400"
        >
          <span>{{ snake.description }}</span>
        </BaseParagraph>
        <BaseParagraph size="xs" class="text-muted-400">
          <span>Updated {{ snake._additional.lastUpdateTimeUnix }}</span>
        </BaseParagraph>
      </div>
      <div class="w-full sm:ms-auto sm:w-auto">
        <BaseButton color="default" class="w-full sm:w-auto" @click="goToSnake(snake)">
          <span>Manage</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

export const useSnake = () => {
  const randomOf = (input: number) => {
    return Math.floor(Math.random() * input)
  }

  const directions = useState('snakeDirections', () => {
    return ['up', 'down', 'left', 'right']
  })
  const tileCount = useState('snakeTileCount', () => 20)

  const snake = useState('snake', () => {
    return [
      {
        x: Math.floor(tileCount.value / 2),
        y: Math.floor(tileCount.value / 2),
      },
    ]
  })
  const food = useState('snakeFood', () => {
    return {
      x: randomOf(tileCount.value),
      y: randomOf(tileCount.value),
    }
  })

  const isRunning = useState('snakeIsRunning', () => false)
  const direction = useState('snakeDirection', () => 'right')
  const score = useState('snakeScore', () => {
    return { id: null, pts: 0 }
  })
  const highscores = useState('snakeHighscores', () => {
    return []
  })
  const lastPlayedScore = useState('snakeLastPlayedScore', () => null)

  const isSnake = (x: number, y: number) => {
    return snake.value.some((segment) => segment.x === x && segment.y === y)
  }

  const isFood = (x: number, y: number) => {
    return food.value.x === x && food.value.y === y
  }

  const snakeCompetitions = useState('snakeCompetitions', () => [])
  const selectedSnakeCompetition = useState('selectedSnakeCompetition', () => {
    return {
       name: '',
       description: '',
       layout: '',
       start_date: '',
       end_date: '',
       customer: '',
       players: [],
       leaderboard: [],
    }
  }
  )

  return {
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
    snakeCompetitions,
    selectedSnakeCompetition,
  }
}

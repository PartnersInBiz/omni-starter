export const useSnakeFunc = () => {
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
  } = useSnake()

  const startGame = () => {
    resetGame()
    if (!isRunning.value) {
      isRunning.value = true
      gameLoop()
    }
  }

  const resetGame = () => {
    score.value.pts = 0
    snake.value = [
      {
        x: Math.floor(tileCount.value / 2),
        y: Math.floor(tileCount.value / 2),
      },
    ]
    direction.value = directions.value[randomOf(directions.value.length)]
    food.value = {
      x: randomOf(tileCount.value),
      y: randomOf(tileCount.value),
    }
  }

  const changeDirection = (newDirection: string) => {
    if (!isRunning.value) return

    switch (direction.value) {
      case 'right':
        direction.value = newDirection === 'left' ? 'up' : 'down'
        break
      case 'left':
        direction.value = newDirection === 'left' ? 'down' : 'up'
        break
      case 'up':
        direction.value = newDirection === 'left' ? 'left' : 'right'
        break
      case 'down':
        direction.value = newDirection === 'left' ? 'right' : 'left'
        break
    }
  }

  const gameLoop = () => {
    if (!isRunning.value) return

    const newHead: any = getNewHead()
    console.log('NEW HEAD', newHead)

    if (isSnake(newHead.x, newHead.y)) {
      saveScore()
      isRunning.value = false
      return
    }

    snake.value.unshift(newHead)
    console.log('SNAKE', snake.value)

    if (isFood(newHead.x, newHead.y)) {
      food.value = {
        x: randomOf(tileCount.value),
        y: randomOf(tileCount.value),
      }
      score.value.id = Date.now()
      score.value.pts += 1
    } else {
      snake.value.pop()
    }

    setTimeout(gameLoop, 120)
  }

  const getNewHead = () => {
    const head = snake.value[0]

    let newHead

    switch (direction.value) {
      case 'right':
        newHead = { x: (head.x + 1) % tileCount.value, y: head.y }
        break
      case 'left':
        newHead = {
          x: (head.x - 1 + tileCount.value) % tileCount.value,
          y: head.y,
        }
        break
      case 'up':
        newHead = {
          x: head.x,
          y: (head.y - 1 + tileCount.value) % tileCount.value,
        }
        break
      case 'down':
        console.log('DOWN')
        newHead = { x: head.x, y: (head.y + 1) % tileCount.value }
        break
    }

    return newHead
  }

  const saveScore = () => {
    const scores = JSON.parse(localStorage.getItem('highscores')) || []
    const newScore = {
      id: score.value.id,
      pts: score.value.pts,
    }

    const scoreExists = scores.some((s: { id: null }) => s.id === newScore.id)
    if (scoreExists) return

    scores.push(newScore)
    scores.sort((a: { pts: number }, b: { pts: number }) => b.pts - a.pts)
    scores.splice(3)

    while (scores.length < 3) {
      scores.push({ id: null, pts: 0 })
    }

    localStorage.setItem('highscores', JSON.stringify(scores))
    localStorage.setItem('lastPlayedScore', JSON.stringify(newScore))

    lastPlayedScore.value = newScore
    highscores.value = scores
  }

  const loadHighscores = () => {
    try {
      const scores = JSON.parse(localStorage.getItem('highscores')) || []
      const lastScore = JSON.parse(localStorage.getItem('lastPlayedScore'))

      while (scores.length < 3) {
        scores.push({ id: null, pts: 0 })
      }

      highscores.value = scores

      if (lastScore) {
        lastPlayedScore.value = lastScore
      }
    } catch (error) {
      console.error('Error loading top scores from local storage:', error)
    }
  }

  const handleKeydown = (e: { key: string }) => {
    if (e.key === 'ArrowLeft') {
      changeDirection('left')
    } else if (e.key === 'ArrowRight') {
      changeDirection('right')
    }
  }

  return {
    startGame,
    resetGame,
    changeDirection,
    gameLoop,
    getNewHead,
    saveScore,
    loadHighscores,
    handleKeydown,
  }
}

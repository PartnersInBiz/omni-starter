export const useTicTacToeFunc = () => {
  const { history, xIsNext, stepNumber, status, current, player, winner } =
    useTicTacToe()

  const onSquareSelection = (event: { index: string }) => {
    history.value = history.value.slice(0, stepNumber.value + 1)
    const squares = current.value.squares.slice(0, current.value.squares.length)
    // do nothing if game already ended, or the square is already taken
    if (winner.value || squares[event.index]) return
    squares[event.index] = player.value
    history.value.push({
      squares: squares,
      position: getPosition(parseInt(event.index, 10)),
    })
    stepNumber.value = history.value.length - 1
    xIsNext.value = !xIsNext.value
    updateStatus()
  }
  const updateStatus = () => {
    console.log('updateStatus', winner.value, player.value)
    if (winner.value) {
      status.value = `Player ${winner.value} won!`
    } else {
      status.value = 'Next player: ' + player.value
    }
  }
  const moveTo = (step: number) => {
    stepNumber.value = step
    xIsNext.value = step % 2 === 0
  }

  /**
   * Get column and row number of a square index
   * @param {*} i
   */
  const getPosition = (i: number) => {
    let row, col
    if (i > 5) {
      row = 3
      col = i - 5
    } else if (i > 2) {
      row = 2
      col = i - 2
    } else {
      row = 1
      col = i + 1
    }
    return {
      row,
      col,
    }
  }

  return {
    onSquareSelection,
    updateStatus,
    moveTo,
    getPosition,
  }
}

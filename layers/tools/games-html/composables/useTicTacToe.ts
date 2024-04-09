export const useTicTacToe = () => {
  const calculateWinner = (squares: any[]) => {
    console.log('calculateWinner', squares)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (const line of lines) {
      const [a, b, c] = line
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const history: any = useState('tictactoeHistory', () => {
    return [
      {
        squares: Array(9).fill(null),
        position: null,
      },
    ]
  })
  const xIsNext = useState('tictactoeXIsNext', () => {
    return true
  })
  const stepNumber = useState('tictactoeStepNumber', () => {
    return 0
  })
  const status = useState('tictactoeStatus', () => {
    return ''
  })

  const current = computed(() => {
    return history.value[stepNumber.value]
  })
  const player = computed(() => {
    return xIsNext.value ? 'X' : 'O'
  })
  const winner = computed(() => {
    return calculateWinner(current.value.squares)
  })

  return {
    history,
    xIsNext,
    stepNumber,
    status,
    current,
    player,
    winner,
  }
}

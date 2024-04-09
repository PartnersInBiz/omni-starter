export const useWordGameFunc = () => {
  const {
    currentWord,
    currentGuess,
    tries,
    progress,
    message,
    words,
    alphabets,
    progressPercent,
    degrees,
    puzzleSolved,
  } = useWordGame()

  const reset = () => {
    currentWord.value = ''
    currentGuess.value = []
    tries.value = 0
    progress.value = 0
    message.value = ''
  }

  const loadGame = () => {
    reset()

    const rnd = Math.floor(Math.random() * words.value.length)
    currentWord.value = words.value[rnd].toUpperCase()
  }

  const getGuessedLetter = (index: string | number) => {
    if (currentGuess.value.includes(currentWord.value[index])) {
      return currentWord.value[index]
    }

    return ''
  }

  const getLetterButtonClass = (letter: any) => {
    if (currentGuess.value.includes(letter)) return 'letter-button-disabled'

    return 'letter-button'
  }

  const makeGuess = (letter: any) => {
    if (currentGuess.value.includes(letter)) return
    currentGuess.value.push(letter)
    tries.value++

    // currentWord.value.split("") -> converts the string to an array
    // then the array is filtered upon which of its elements matches the letter
    // the length of the filtered array is how many characters were guessed correctly
    progress.value += currentWord.value
      .split('')
      .filter((e: any) => e === letter).length

    if (puzzleSolved.value) {
      // solved
      message.value = `Congratulations! You found the word ${currentWord.value} in ${tries.value} tries! Click on the button below to begin a new game.`
    }
  }

  return {
    reset,
    loadGame,
    getGuessedLetter,
    getLetterButtonClass,
    makeGuess,
  }
}

import React from 'react'

export function processGuess(guesses, currentGuess, mysteryWord) {
  if (guesses.length < 5) {
    const guessString = currentGuess.join('');
    if (guessString === mysteryWord) {
      console.log("win")
      winGame()
    } else if (wordList.includes(guessString)) {
      console.log('try again');
      evalLetters(guessString)
    } else {
      console.log('Not in the word list');
      // renewInput()
    }
    setGuesses([...guesses, guessString]);
    setCurrentGuess(['','','','','']);
  } else {
    console.log("game over")
    // gameOver()
  }
}


import { useState, useEffect } from 'react';
import './style.css';
import { useAtom } from 'jotai';
import { currentGuessAtom, guessesAtom, gameWonAtom } from '../../../stores/gameAtoms';
import Cell from '../Cell';

const wordList = ["MAYBE", "TOUPI", "BROWN", "YALMB"];
const mysteryWord = "YOUPI";

const initialGrid = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
];

function Grid() {
  const [currentGuess, setCurrentGuess] = useAtom(currentGuessAtom);
  const [grid, setGrid] = useState(initialGrid);
  const [guesses, setGuesses] = useAtom(guessesAtom);
  const [winGame, setWinGame] = useAtom(gameWonAtom);
  const [letterStatuses, setLetterStatuses] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ]);

  useEffect(() => {
    addLetterToRow();
  }, [currentGuess])

  useEffect(() => {
    updateGrid();
  },  [guesses]);


  const addLetterToRow = () => {
    const rowIndex = guesses.length;
    if (rowIndex < 6) {
      const newGrid = [...grid];
      let currentGuess2 = currentGuess.join('');
      for (let i = 0; i < 5; i++) {
        newGrid[rowIndex][i] = currentGuess2[i];
      }
      setGrid(newGrid);
    }
};


  const processGuess = () => {
    if (guesses.length < 5) {
      const guessString = currentGuess.join('');
      if (guessString === mysteryWord) {
        console.log("win")
        // winGame()
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
  };


  const evalLetters = (guessString) => {
    const rowIndex = guesses.length;
    const newLetterStatuses = [...letterStatuses];
    for (let i = 0; i < 5; i++) {
      if (guessString[i] === mysteryWord[i]) {
        console.log("perfect");
        newLetterStatuses[rowIndex][i] = "perfect";
      } else if (mysteryWord.includes(guessString[i])) {
        newLetterStatuses[rowIndex][i] = "correct";
      } else {
        newLetterStatuses[rowIndex][i] = "wrong";
      }
    }
    setLetterStatuses(newLetterStatuses);
};


  const updateGrid = () => {
    const newGrid = [...initialGrid];
    for (let i = 0; i < guesses.length; i++) {
      for (let j = 0; j < 5; j++) {
        newGrid[i][j] = guesses[i][j];
      }
    }
    setGrid(newGrid);
  };


  return (
    <div className="grid">
      <div className="row-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((letter, index) => (
              <Cell
              key={index}
              letter={letter}
              letterStatus={letterStatuses[rowIndex][index]} />
            ))}
          </div>
        ))}
      </div>
      <button onClick={processGuess}>Guess</button>
    </div>
  );
}

export default Grid;

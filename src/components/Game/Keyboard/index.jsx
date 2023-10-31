import Key from "../Key";
import { useState } from 'react';
import { useAtom } from "jotai";
import { currentGuessAtom } from "../../../stores/gameAtoms";

import './style.css'

function Keyboard() {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [currentGuess, setCurrentGuess] = useAtom(currentGuessAtom)
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyClick = (letter) => {

    if (!selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);
      setCurrentGuess([...currentGuess, letter]);
    }
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {row1.map((key) => (
          <Key
            letter={key}
            isSelected={selectedLetters.includes(key)}
            onClick={handleKeyClick}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((key) => (
          <Key
            letter={key}
            isSelected={selectedLetters.includes(key)}
            onClick={handleKeyClick}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row3.map((key) => (
          <Key
            letter={key}
            isSelected={selectedLetters.includes(key)}
            onClick={handleKeyClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Keyboard

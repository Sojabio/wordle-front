import Letterkey from "../Keyboardkeys/Letterkeys";
import Enterkey from "../Keyboardkeys/Enterkey";
import Deletekey from "../Keyboardkeys/Deletekey";

import { useState } from 'react';
import { useAtom } from "jotai";
import { currentGuessAtom } from "../../../stores/gameAtoms";
import { processGuess } from "../Logic/logic";

import './style.css'

function Keyboard() {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [currentGuess, setCurrentGuess] = useAtom(currentGuessAtom)
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleLetterkeyClick = (letter) => {
    if (!selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);
      setCurrentGuess([...currentGuess, letter]);
    }
  };

  const handleDeletekeyClick = () => {
    console.log('Delete key clicked');
    if (selectedLetters.length > 0) {
      const updatedSelectedLetters = selectedLetters.slice(0, -1);
      setSelectedLetters(updatedSelectedLetters);
      const updatedCurrentGuess = currentGuess.slice(0, -1);
      setCurrentGuess(updatedCurrentGuess);
      console.log(selectedLetters)
      console.log(currentGuess)
    }
  };


  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {row1.map((Letter, index) => (
          <Letterkey
            key={Letter[index]}
            letter={Letter}
            isSelected={selectedLetters.includes(Letter)}
            onClick={handleLetterkeyClick}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((Letter, index) => (
          <Letterkey
            key={Letter[index]}
            letter={Letter}
            isSelected={selectedLetters.includes(Letter)}
            onClick={handleLetterkeyClick}
          />
        ))}
      </div>
      <div className="keyboard-row">
        <Enterkey onClick={processGuess}/>
        {row3.map((Letter, index) => (
          <Letterkey
            key={Letter[index]}
            letter={Letter}
            isSelected={selectedLetters.includes(Letter)}
            onClick={handleLetterkeyClick}
          />
        ))}
        <Deletekey onClick={handleDeletekeyClick}/>
      </div>
    </div>
  );
}

export default Keyboard

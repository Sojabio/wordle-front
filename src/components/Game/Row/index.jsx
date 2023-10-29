import Letter from "../Letter"
import './style.css'
import { useAtom } from 'jotai'
import { currentGuessAtom } from "../../../stores/gameAtoms"
import { guessCounterAtom } from "../../../stores/gameAtoms"

function Row() {
  const [currentGuess] = useAtom(currentGuessAtom)
  const [guessCounter] = useAtom(guessCounterAtom)

  console.log(`this is current Guess from row : ${currentGuess}`)
  console.log(`this is guesscounter from row : ${guessCounter}`)


  return (
    <div className="row">
      <div className="letter-row">
        <Letter letter={currentGuess[0]}/>
        <Letter letter={currentGuess[1]}/>
        <Letter letter={currentGuess[2]}/>
        <Letter letter={currentGuess[3]}/>
        <Letter letter={currentGuess[4]}/>
      </div>
    </div>
  )
}

export default Row

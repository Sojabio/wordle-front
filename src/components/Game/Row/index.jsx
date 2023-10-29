import Letter from "../../Letter"
import './style.css'

function Row() {
  return (
    <div className="row">
      <div className="letter-row">
        <Letter/>
        <Letter/>
        <Letter/>
        <Letter/>
        <Letter/>
      </div>
    </div>
  )
}

export default Row

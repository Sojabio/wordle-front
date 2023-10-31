import '../style.css'

function Letterkey({letter, isSelected, onClick}) {

  const keyClassName = `key ${isSelected ? 'key-selected' : 'key'}`

  return (
    <div className={keyClassName} onClick={() => onClick(letter)}>
      {letter}
    </div>
  )
}

export default Letterkey

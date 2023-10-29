import './style.css'

function Key({letter, isSelected, onClick}) {

  const keyClassName = `key ${isSelected ? 'key-selected' : 'key'}`

  return (
    <div className={keyClassName} onClick={() => onClick(letter)}>
      {letter}
    </div>
  )
}

export default Key

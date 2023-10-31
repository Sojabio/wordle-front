import './style.css';

function Cell({letter, letterStatus}) {

  return (
    <div className={`cell ${letterStatus}`}>

        {letter}

    </div>
  );
}

export default Cell;

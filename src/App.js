
import { useState } from 'react';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
  }
  return false

}

function Square({ value, onSquareClick }) {


  return <button onClick={onSquareClick} className="square">{value}</button>
}

function Board({ xIsNext, onPlay, squares }) {




  




  function handelClick(i) {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice()
    if (xIsNext) {

      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)


  }
  return (
    <>

      <Square value={squares[0]} onSquareClick={() => handelClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handelClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handelClick(2)} />

      <Square value={squares[3]} onSquareClick={() => handelClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handelClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handelClick(5)} />


      <Square value={squares[6]} onSquareClick={() => handelClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handelClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handelClick(8)} />

    </>
  );
}

export default function Game() {



  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  const winner = calculateWinner(currentSquares)
  let status

  if (winner) {
    status = `Winner: ${winner}`

  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`
  }




  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)

  }

  function jumpTo(move) {

    setCurrentMove(move)


  }



  const moves = history.map((square, move) => {
    let description


    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = `Go to game start`
    }




    return <>
      <li key={move}>
        <button className='btn' onClick={() => { jumpTo(move) }}>{description}</button>
      </li>
    </>

  })


  return (
    <div className="game">
      <div className='section-1'>
       <h1>{status}</h1>
      </div>
      <div className='section-2'>

        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>

    </div>
  );
}


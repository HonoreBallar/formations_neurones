import { useState } from 'react';
import './App.css'

function Square({value, onSquareClick}) {
  
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function Board({ xIsNext, squares, onPlay }) {

  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

  const handleClik = (index) => {
    if(squares[index]  || calculateWinner(squares)){
      return;
    }
    const newSquares = squares.slice();
    if(xIsNext){
      newSquares[index] = 'X';
    }else{
      newSquares[index] = 'O';
    }

    onPlay(newSquares);
    
  }
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = `Winner: ${winner}`;
  }else{
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClik(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClik(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClik(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClik(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClik(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClik(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClik(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClik(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClik(8)}/>
      </div>
    </>
  )
}
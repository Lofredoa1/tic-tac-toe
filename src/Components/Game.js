import React, { useState } from "react";
import Board from "./Board";
import "../App.css";

const Game = () => {
    // state to track moves, turn count, and who's up
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [turnCount, setTurnCount] = useState(0);
  const [xIsNext, setXisNext] = useState(true);

  // shows who's turn it is
  const indicator = xIsNext ? "X" : "O";

  // Function to determine if there is a winning combination
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  };

  // variable to store if winner has been determined
  const winner = calculateWinner(history[turnCount])

  const handleClick = (i) => {
    const historyPoint = history.slice(0, turnCount + 1);
    const current = historyPoint[turnCount];
    const squares = [...current];
    // Does nothing if there is a winner or space is occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = indicator;
    setHistory([...historyPoint, squares]);
    setTurnCount(historyPoint.length);
    setXisNext(!xIsNext);
  };

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div className="game-container">
        <Board squares={history[turnCount]} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>
            <h2>{winner ? "The Winner is: " + winner : "Next Player is: " + indicator}</h2>
        </div>
        <button>Start the Game</button>
      </div>
    </>
  );
};

export default Game;

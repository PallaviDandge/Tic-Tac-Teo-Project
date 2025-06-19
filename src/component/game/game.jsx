import { useEffect, useState } from "react";
import "./game.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";
import Confetti from "react-confetti"; // 🎉 import this

const initialBoard = Array(9).fill(null);

function Game() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("ticTacToeHistory")) || [];
    setHistory(savedHistory);
    setLoading(false);
  }, []);

  const calculateWinner = (squares) => {
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
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);

      const newHistory = [...history, { winner: win, board: newBoard }];
      localStorage.setItem("ticTacToeHistory", JSON.stringify(newHistory));
      setHistory(newHistory);
    }

    setXIsNext(!xIsNext);
  };

  const restart = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  };

  const downloadExcel = async () => {
    if (!history.length) {
      alert("No game history to export!");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Game History");

    worksheet.columns = [
      { header: "Winner", key: "winner", width: 10 },
      { header: "Board", key: "board", width: 30 }
    ];

    history.forEach((game) => {
      worksheet.addRow({
        winner: game.winner || "N/A",
        board: Array.isArray(game.board) ? game.board.join("") : "Invalid board"
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    saveAs(blob, "TicTacToe_History.xlsx");
  };

  const isBoardFull = (squares) => {
    return squares.every((cell) => cell != null);
  };

  return (
    <>
      <div className="app">
        <h1>Tic-Tac-Toe</h1>

        {winner && <Confetti />}

        <div className="board">
          {board.map((cell, i) => (
            <button key={i} onClick={() => handleClick(i)} className="cell">
              {cell}
            </button>
          ))}
        </div>

        <p className="status">
          {winner
            ? `Winner: ${winner}`
            : isBoardFull(board)
            ? "Oops! Better luck next time!"
            : `Next: ${xIsNext ? "X" : "O"}`}
        </p>

        <button onClick={restart} className="restart">
          Restart
        </button>
      </div>

      {winner && <div className="winner-popover">🎉 Winner: {winner} 🎉</div>}
      <div className="gameHistoryWrapper">
        <div className="gameHistory">
          <h2>Download Game History</h2>
          <button
            onClick={downloadExcel}
            className="downloadBtn"
            disabled={loading || history.length === 0}
          >
            <FiDownload size={24} />
          </button>
          {loading && <p>Loading game history...</p>}
        </div>
      </div>
    </>
  );
}

export default Game;

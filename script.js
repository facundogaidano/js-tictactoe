const Gameboard = () => {
  const rows = 3
  const columns = 3
  const board = Array.from({ length: rows }, () => Array(columns).fill(0))

  return { board }
}

const checkWinner = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== 0) {
      return board[i][0]
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== 0) {
      return board[0][i]
    }
  }

  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) {
    return board[0][0]
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
    return board[0][2]
  }

  let isDraw = true
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        isDraw = false
        break
      }
    }
    if (!isDraw) break
  }

  return isDraw ? "Draw" : null
}

const updateBoard = (board, row, column, player) => {
  if (board[row][column] === 0) {
    board[row][column] = player
    return true
  }
  return false
}

let currentPlayer = 1;
let gameboard = Gameboard();
let gridCreated = false;

const playGame = () => {
  const gameBoardElement = document.getElementById("game-board")
 
  for (let i = 0; i < 3; i++) {
     for (let j = 0; j < 3; j++) {
       const cell = document.createElement("div");
       cell.classList.add("cell");
       gameBoardElement.appendChild(cell);
     }
  }
 
  const cells = document.querySelectorAll(".cell")
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!cell.classList.contains("disabled")) {
            const row = Math.floor(index / 3)
            const column = index % 3

            if (updateBoard(gameboard.board, row, column, currentPlayer)) {
                cell.textContent = currentPlayer === 1 ? "X" : "O"
                cell.classList.add("disabled")
                currentPlayer = currentPlayer === 1 ? 2 : 1

                const winner = checkWinner(gameboard.board);
                if (winner === "Draw") {
                    document.getElementById("message").textContent = "It's a draw!"
                    const cells = document.querySelectorAll(".cell")
                    cells.forEach(cell => {
                        cell.classList.add("disabled")
                    });
                } else if (winner) {
                    document.getElementById("message").textContent = `Player ${winner} won!`
                    const cells = document.querySelectorAll(".cell")
                    cells.forEach(cell => {
                        cell.classList.add("disabled")
                    });
                }
            }
        }
    });
  });
};
 
playGame();

const resetGame = () => {
  gameboard = Gameboard();
  currentPlayer = 1;
 
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove("disabled");
  });
  document.getElementById("message").textContent = '';
};
 
document.getElementById("reset-btn").addEventListener("click", resetGame);
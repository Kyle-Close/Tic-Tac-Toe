const gameBoardSquares = document.querySelectorAll(".square");
const playerTurnDisplay = document.querySelector(".player > h2");

const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

class GameBoard {
  constructor() {
    this.spots = ["", "", "", "", "", "", "", "", ""];
    this.player1 = new Player("X", "Kyle");
    this.player2 = new Player("O", "Claire");
    this.turn = 0;
  }
  executeTurn(e) {
    // Get corresponding array index from square
    let classList = [...e.target.classList];
    let index = classList[1] - 1;

    if (this.spots[index] != "") {
      return;
    }

    if (this.turn % 2 == 0) {
      // Player 1 turn
      e.target.textContent = this.player1.letter;
      this.spots[index] = this.player1.letter;
    } else {
      // Player 2 turn
      e.target.textContent = this.player2.letter;
      this.spots[index] = this.player2.letter;
    }

    if (this.turn > 7) {
      endGame();
    }

    if (checkForWinner()) {
      if (this.turn % 2 === 0) {
        console.log(`${this.player1.name} wins!`);
        playerTurnDisplay.textContent = `${this.player1.name} wins!`;
        endGame(this.player1);
      } else {
        console.log(`${this.player2.name} wins!`);
        playerTurnDisplay.textContent = `${this.player2.name} wins!`;
        endGame(this.player2);
      }

      return;
    }

    this.turn++;
    displayPlayerTurn();
  }
}

class Player {
  constructor(letter, name) {
    this.letter = letter;
    this.name = name;
  }
}

function displayPlayerTurn() {
  if (board.turn % 2 == 0) {
    playerTurnDisplay.textContent = `${board.player1.name}'s turn`;
  } else {
    playerTurnDisplay.textContent = `${board.player2.name}'s turn`;
  }
}

function checkForWinner() {
  if (board.turn < 3) {
    return false;
  }

  for (let i = 0; i < winConditions.length; i++) {
    let indexOne = winConditions[i][0];
    let indexTwo = winConditions[i][1];
    let indexThree = winConditions[i][2];
    if (
      board.spots[indexOne] === board.spots[indexTwo] &&
      board.spots[indexOne] === board.spots[indexThree] &&
      board.spots[indexOne] !== ""
    ) {
      return true;
    }
  }
}

let board = new GameBoard();

displayPlayerTurn();

[...gameBoardSquares].forEach((square) => {
  square.addEventListener("click", (e) => {
    board.executeTurn(e);
  });
});

function endGame(winner) {
  if (!winner) {
    alert("tie");
  } else {
    alert(`${winner.name} wins!`);
  }
  board = new GameBoard();
  [...gameBoardSquares].forEach((square) => {
    square.textContent = "";
  });
}

Player = (token) => {
  
  return {
    token
  }
}

const board = (() => {
  let cells = Array(9).fill(null);

  const isValidPosition = (position) => {
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position) && !cells[position]) {
      return true;
    } else {
      return false;
    }
  }

  const updateCell = (token, position) => {
    cells[position] = token;
  }

  const wonHorizontally = () => {
    let rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    return rows.some((row) => {
      return row.every((r, ix, arr) => {

        return (cells[r] != undefined) && (cells[r] === cells[arr[0]]);
      });
    });
  }

  const wonVertically = () => {
    let cols = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    return cols.some((col) => {
      return col.every((c, ix, arr) => {
        return (cells[c] != undefined) && (cells[c] == cells[arr[0]]);
      });
    });
  }

  const wonDiagonally = () => {
    let diags = [
      [0, 4, 8],
      [2, 4, 6]
    ];

    return diags.some((diag) => {
      return diag.every((d, ix, arr) => {
        return (cells[d] != undefined) && (cells[d] == cells[arr[0]]);
      });
    });
  }

  const isDraw = () => {
    return cells.every((c) => c != null);
  }

  const reset = () => {
    cells = Array(9).fill(null);
  }

  const getCells = () => cells;

  return {
    isValidPosition,
    updateCell,
    wonDiagonally,
    wonHorizontally,
    wonVertically,
    isDraw,
    reset,
    getCells
  }
})();

const game = (() => {
  let players = [
    Player('O'), Player('X')
  ];
  let currentPlayer = players[Math.floor(Math.random() * players.length)];

  const win = () => {
    console.log(board.wonHorizontally(), board.wonVertically(), board.wonDiagonally());

    return board.wonHorizontally() || 
      board.wonVertically() ||
      board.wonDiagonally()
    ;
  }

  const draw = () => {

    return board.isDraw();
  }

  const state = () => {
    if (win() == true) {
      return 1;
    } else if (draw() == true) {
      return 2;
    } else {
      return 0;
    }
  }

  const switchPlayers = () => {
    currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
  }

  const play = (position) => {
    if (board.isValidPosition(position)) {
      board.updateCell(currentPlayer.token, position); // 

      return true;
    } else {
      return false;
    }
  }

  const getBoard = () => board;

  const getCurrentPlayer = () => currentPlayer;

  const reset = () => {
    switchPlayers();
    board.reset();
  }

  return {
    getBoard,
    getCurrentPlayer,
    win,
    draw,
    state,
    switchPlayers,
    play,
    reset
  };
})();

const ui = (() => {

  const render = () => {
    
    let board = game.getBoard();
    
    let divBoard = document.getElementById("board");
    while (divBoard.firstChild) divBoard.removeChild(divBoard.firstChild);

    for (let i=0; i < board.getCells().length; i++) {
      var div = document.createElement("div");
      div.textContent = board.getCells()[i];
      div.setAttribute('class', 'square');
      div.setAttribute('data-cell-idx', i);
      
      divBoard.appendChild(div);
    }
  }

  const printMessage = (message) => {
    document.getElementById("message").textContent = message;
  }

  const addListeners = () => {
    let cells = document.querySelectorAll("div.square");

    for (let i=0; i < cells.length; i++) {
      let cell = cells[i];

      cell.addEventListener('click', function(e) {
        e.preventDefault();
        
        let cellIdx = Number(cell.dataset.cellIdx);
        let isOK = game.play(cellIdx);

        if (!isOK) {
          printMessage("Invalid move");
        } else {

          let state = game.state();
          if (state == 1) {
            printMessage(`The Player ${game.getCurrentPlayer().token} WON !`);
            toggleBoard();

          } else if (state == 2) {
            printMessage("It's a DRAW");
            toggleBoard();
          } else {
            printMessage("");
            game.switchPlayers();
          }
        }

        display();
      });
    }
  }

  updateCurrentPlayer = () => {
    let cp = game.getCurrentPlayer();
    document.getElementById("current").textContent = `Player ${cp.token == 'O' ? 1 : 2}`;
  }

  toggleBoard = () => {
    document.getElementById("board").classList.toggle('disabled');
    document.getElementById("restart-game").classList.toggle('hidden');

    document.getElementById("restart-btn").addEventListener("click", function(e) {
      e.preventDefault();

      game.reset();
      display();
      toggleBoard();
      printMessage("");
      updateCurrentPlayer();
    });
  }

  const display = () => {
    render();
    updateCurrentPlayer();
    addListeners();
  }

  return {
    display
  }
})();

ui.display();

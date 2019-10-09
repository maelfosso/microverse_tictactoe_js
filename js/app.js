Player = (token) => {
  
  return {
    token
  }
}

const board = (() => {
  let cells = Array(9).fill(null);

  const isValidPosition = (position) => {
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position) && 
        cells[position] != null) {
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
        return cells[r] == cells[arr[0]];
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
        return cells[c] == cells[arr[0]];
      });
    });
  }

  const wonDiagonally = () => {
    let diags = [
      [0, 4, 8],
      [2, 4, 6]
    ];

    diags.some((diag) => {
      return diag.every((d, ix, arr) => {
        return cells[d] == cells[arr[0]];
      });
    });
  }

  const isDraw = () => {
    return cells.every((c) => c != null);
  }

  const reset = () => {
    cells = Array(9).fill(null);
  }



  return {
    updateCell,
    wonDiagonally,
    wonHorizontally,
    wonVertically,
    isDraw,
    reset
  }
})();

const game = (() => {
  let players = [
    Player('O'), Player('X')
  ];
  let currentPlayer;

  const win = () => {
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

  const switching = () => {
    currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
  }

  const play = (position) => {
    if (board.isValidPosition(position)) {
      board.updateCell(currentPlayer.token, position);

      return true;
    } else {
      return false;
    }
  }

  return {
    win,
    draw,
    state,
    switching,
    play
  };
})();

// a player play in cell 
// we check winning or draw
//   * winning 
//     - horizontal 
//     - vertical 
//     - diagonal
//   * draw 
//     - all the cells are fill 

// we switch the players 

// Game 
//   - players 
//   - board 
//   - current player 
//   * current player plays in a position 
//     * check if it's a valid position
//     * check if the board at that position is empty
//     * update cells board for that position 
//     * 
//   * check win / draw 
//     * check if board win in horizontal
//     * check if board win in vertical
//     * check if board win in diagonal
//     * check if all the cells board are filled 
//   * switch players 
//   * restart the game 
//     * empty all cells board 
// GameBoard 
//   - cells 
//   * update cell with token 
//   * win horizontal
//   * win vertical
//   * win diagonal


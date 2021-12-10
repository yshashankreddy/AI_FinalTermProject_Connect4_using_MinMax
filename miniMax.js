let depth = 5;

let scores = {
  1: 100000,
  2: -100000,
};


function bestMove() {

  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  let tempI;





  for (let j = 0; j < w; j++) {
    // Is the spot available?

    tempI = nextSpace(j);


    if (tempI >= 0) {

      board[tempI][j] = 1;

      let score = minimax(board, depth, false, 1);

      board[tempI][j] = 0;

      if (score > bestScore) {
        bestScore = score;
        move = j;

      }
    }
  }

  player = 2;
  return (move);
}

function score_position(player, player2, nr_moves) {
  //heuristic could be more in depth, using 
  let score = 0

  for (i = 1; i < h; i++) {
    for (j = 1; j < w; j++) {
      if ((countPieces(i, j, i + 4, j, player) == 3 && countPieces(i, j, i + 4, j, 0) == 1) || (countPieces(i, j, i, j + 4, player) == 3 && countPieces(i, j, i, j + 4, 0) == 1) ||
        (countDiagonal(i, j, 0, player) == 3 && countDiagonal(i, j, 1, 0) == 1)) {
        score += 1000;
      }

      if ((countPieces(i, j, i + 4, j, player) == 2 && countPieces(i, j, i + 4, j, 0) == 2) || (countPieces(i, j, i, j + 4, player) == 2 && countPieces(i, j, i, j + 4, 0) == 2) ||
        (countDiagonal(i, j, 0, player) == 2 && countDiagonal(i, j, 1, 0) == 2)) {
        score += 10;
      }

      if ((countPieces(i, j, i + 4, j, player) == 1 && countPieces(i, j, i + 4, j, 0) == 3) || (countPieces(i, j, i, j + 4, player) == 1 && countPieces(i, j, i, j + 4, 0) == 3) ||
        (countDiagonal(i, j, 0, player) == 1 && countDiagonal(i, j, 1, 0) == 3)) {
        score += 1;

      }

      if ((countPieces(i, j, i + 4, j, player2) == 3 && countPieces(i, j, i + 4, j, 0) == 1) || (countPieces(i, j, i, j + 4, player2) == 3 && countPieces(i, j, i, j + 4, 0) == 1) ||
        (countDiagonal(i, j, 0, player2) == 3 && countDiagonal(i, j, 1, 0) == 1)) {
        score -= 1000;

      }

      if ((countPieces(i, j, i + 4, j, player2) == 2 && countPieces(i, j, i + 4, j, 0) == 2) || (countPieces(i, j, i, j + 4, player2) == 2 && countPieces(i, j, i, j + 4, 0) == 2) ||
        (countDiagonal(i, j, 0, player2) == 2 && countDiagonal(i, j, 1, 0) == 2)) {
        score -= 10;
      }

      if ((countPieces(i, j, i + 4, j, player2) == 1 && countPieces(i, j, i + 4, j, 0) == 3) || (countPieces(i, j, i, j + 4, player2) == 1 && countPieces(i, j, i, j + 4, 0) == 3) ||
        (countDiagonal(i, j, 0, player2) == 1 && countDiagonal(i, j, 1, 0) == 3)) {
        score -= 1;

      }
    }
  }

  return score
}

function countPieces(i, j, i2, j2, player) {
  let pieces = 0;

  for (i; i < i2; i++) {
    for (j; j < j2; j++) {
      if (board[i][j] == player) {
        pieces += 1;
      }

    }

  }
  return pieces;
}

function countDiagonal(i, j, direction, player) {

  let pieces = 0;

  for (x = 0; x < 4; x++) {
    if (direction == 1) {
      if (i + x < h && j + x < w) {

        if (board[i + x][j + x] == player) {
          pieces += 1;
        }
      }

    } else {
      if (i + x < h && j - x < w && j - x > 0) {

        if (board[i + x][j - x] == player) {
          pieces += 1;
        }

      }

    }

  }
  return pieces;
}

function minimax(board, depth, isMaximizing, nr_moves) {

  let result = getWinner();
  if (result > 0) {
    return scores[result] - 20 * nr_moves;
  }

  if (result == -1) {
    return 0 - 50 * nr_moves;
  }

  if (depth == 0) {
    return score_position(1, 2, nr_moves);
  }





  if (isMaximizing) {

    let bestScore = -Infinity;
    for (let j = 0; j < w; j++) {
      let tempI = nextSpace(j);

      if (tempI < h && tempI > -1) {

        board[tempI][j] = 1;

        let score = minimax(board, depth - 1, false, nr_moves + 1);

        board[tempI][j] = 0;

        bestScore = max(score, bestScore);
      }
    }

    return bestScore;

  } else {

    let bestScore = Infinity;
    for (let j = 0; j < w; j++) {
      // Is the spot available?
      let tempI = nextSpace(j);

      if (tempI < h && tempI > -1) {

        board[tempI][j] = 2;

        let score = minimax(board, depth - 1, true, nr_moves + 1);

        board[tempI][j] = 0;

        bestScore = min(score, bestScore);
      }
    }

    return bestScore;
  }
}
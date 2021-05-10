export const USER = 'You';
export const AI = 'AI';
export const TIE = 'TIE';

/**
 * create a new grid of the game
 */
export const createNewGrid = () => {
  const innerGrid = Array(3)
    .fill()
    .map(() => null);
  return Array(3)
    .fill()
    .map(() => innerGrid);
};

/**
 * scores for the player for AI to win
 */
const scores = {
  [USER]: -1,
  [AI]: 1,
  [TIE]: 0,
};

/**
 * get  all the empty cells of a grid
 * @param grid -> grid to get the empty cells
 */
const getAllMoves = grid => {
  const moves = [];
  for (let row in grid) {
    for (let col in grid[row]) {
      if (grid[row][col] === null) {
        moves.push([row, col]);
      }
    }
  }

  return moves;
};

/**
 * get the winner of the game
 * @param grid -> grid for which the winner needs to be found
 */
export const getWinner = grid => {
  const winningWays = [
    // horizontal
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // vertical
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // cross
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ];

  for (let [i, j, k] of winningWays) {
    // every ways should be equal and not null
    if (
      grid[i[0]][i[1]] === grid[j[0]][j[1]] &&
      grid[j[0]][j[1]] === grid[k[0]][k[1]] &&
      grid[k[0]][k[1]] !== null
    )
      return grid[i[0]][i[1]];
  }

  // if there is no empty cell then no one wins
  const empty = getAllMoves(grid);
  if (!!empty.length) return null;

  // if all the cells are filled and no one win then it is a tie
  return TIE;
};

/**
 * get the Best Move of the game with minimax algo
 * @param grid -> grid of the game
 * @param difficulty -> difficulty of the AI
 */
export function getBestMove(grid, difficulty) {
  // copying the grid just not to change the parameter value
  const gridCopy = grid.map(row => [...row]);

  let bestMove;
  let bestScore = -Infinity;
  const moves = getAllMoves(gridCopy);

  console.log('difficulty:', difficulty);

  for (let [i, j] of moves) {
    // simulate the move as played and get the score
    gridCopy[i][j] = AI;
    // get the score for the game if AI has played the current move
    // as AI played the move (simulated) so the player now is a minimizing player
    let score = minimax(gridCopy, false, difficulty);
    // removing the simulated move
    gridCopy[i][j] = null;
    console.log('move:', [i, j], 'score:', score);
    // the move with best score is the best move
    if (score >= bestScore) {
      bestScore = score;
      bestMove = [i, j];
    }
  }
  // returning the best move possible for the given grid
  return bestMove;
}

/**
 * get the score of the current board
 * @param grid -> grid of the current game board
 */
function getScore(grid) {
  let AICount = 0;
  let USERCount = 0;

  grid.forEach(row => {
    row.forEach(col => {
      if (col === AI) AICount++;
      else if (col === USER) USERCount++;
    });
  });

  return AICount - USERCount;
}

/**
 * Minimax function
 * -> get the grid and simulate all the possible moves for each players
 * -> AI is maxplayer trying to maximize his score
 * -> USER is minPlayer trying to minimize his score
 * -> finally the best score of the current move is returned
 * @param grid -> grid of the current game
 * @param maxPlayer -> if the current player is a maximizing player or not
 * @param depth -> max depth to make the decision of the move
 */
function minimax(grid, maxPlayer, depth, alpha, beta) {
  // check untill there is a winner
  // if winner is found return its score
  const winner = getWinner(grid);
  if (winner !== null) return scores[winner] * depth;
  if (depth === 0) return getScore(grid);

  if (maxPlayer) {
    // maxPlayer is the AI player
    let bestScore = -Infinity;

    // simulating the move and getting the best score as above
    const moves = getAllMoves(grid);
    for (let [i, j] of moves) {
      grid[i][j] = AI;
      let score = minimax(grid, false, depth - 1, alpha, beta);
      grid[i][j] = null;
      // best score is maximum of old best score and current score
      bestScore = Math.max(bestScore, score);
      // changing the alpha value
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return bestScore;
  } else {
    // minPlayer is the user
    let bestScore = Infinity;

    // same is done for minPlayer which is the user
    // assuming the user will play optimally
    const moves = getAllMoves(grid);
    for (let [i, j] of moves) {
      grid[i][j] = USER;
      let score = minimax(grid, true, depth - 1, alpha, beta);
      grid[i][j] = null;
      // best score is minimum of old best score and current score
      bestScore = Math.min(bestScore, score);
      // updating the beta value
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return bestScore;
  }
}

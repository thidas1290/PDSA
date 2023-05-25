// constants.ts

const SCORES = {
    1: 1,
    0: 0,
    2: -1,
};
const PLAYER_X = 1;
const PLAYER_O = 2;

const switchPlayer = (player)=>{
    return player == PLAYER_X ? PLAYER_O : PLAYER_X;
}
  
export const minimax = (board, player) => {
    // initialize the multiplier to adjust scores based on the player's perspective
    const multiplier = SCORES[player];
    let thisScore;
    let maxScore = -1;
    let bestMove = null;
    // check if the game is over and return the score and move if so
    const winner = board.getWinner();
    if (winner !== null) {
        return [SCORES[winner], 0];
    } else {
        // loop through each empty square on the board
        for (const square of board.getEmptySquares()) {
        // create a copy of the board and make a move for the current player
        let copy = board.clone();
        copy.makeMove(square, player);
        // recursively call minimax on the resulting board state, s
        // switching the player and multiplying the resulting score by the multiplier
        thisScore = multiplier * minimax(copy, switchPlayer(player))[0];

        // update the maxScore and bestMove variables if the current move 
        // produces a higher score than previous moves
        if (thisScore >= maxScore) {
            maxScore = thisScore;
            bestMove = square;
        }
        }
        
        // return the best score found, multiplied by the multiplier, 
        // and the corresponding best move as a tuple
        return [multiplier * maxScore, bestMove];
}
};
  
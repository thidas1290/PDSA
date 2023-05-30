import { useEffect, useState, useCallback } from "react";
import styled from "styled-components"
import Board from "../dsa/Board";
import { minimax } from "../dsa/minmax";
import { Button } from "@material-tailwind/react";

const DIMENSIONS = 3;
const SQUARE_DIMS = 100;
const DRAW = 0;
const PLAYER_X = 1;
const PLAYER_O = 2;

const GAME_STATUS = {
    notStarted: "not_started",
    inProgress: "in_progress",
    over: "over"
}

const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);

const board = new Board();

const TicTacToe = ()=> {
    
    const [name, setName] = useState(null);
    const [winner, setWinner] = useState();
    const [grid, setGrid] = useState(emptyGrid);
    const [players, setPlayers] = useState({
      human: null,
      ai: null,
    });
    const [gameState, setGameState] = useState(GAME_STATUS.notStarted);
    
    const switchPlayer = (player)=>{
        return player == PLAYER_X ? PLAYER_O : PLAYER_X;
    }

    const [nextMove, setNextMove] = useState(null);


    const choosePlayer = (option)=>{
        setPlayers({human: option, ai: switchPlayer(option)})
        setGameState(GAME_STATUS.inProgress);
        setNextMove(PLAYER_X)
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
   

    const move = useCallback((index, player) => {
        if (player && gameState === GAME_STATUS.inProgress) {
            setGrid((grid) => {
                const gridCopy = grid.concat();
                gridCopy[index] = player;
                return gridCopy;
                });
            }
    },[gameState]);
    
    const aiMove = useCallback(() => {
      const board_ = new Board(grid.concat());

      let index = getRandomInt(0, 8);
      while (grid[index]) {
        index = getRandomInt(0, 8);
      }
      // const index = board.isEmpty(grid)
      //   ? getRandomInt(0, 8)
      //   : minimax(board, players.ai)[1];
      // minimax(board_, players.ai)
     
      if (index !== null && !grid[index]) {
        move(index, players.ai);
        setNextMove(players.human);
      }
    }, [move, grid, players]);
      
  
    const humanMove = (index) => {
        if (!grid[index] && nextMove == players.human) {
            move(index, players.human);
            setNextMove(players.ai);
        }
    };

    const startNewGame = ()=> {
        setGameState(GAME_STATUS.notStarted);
        setGrid(emptyGrid);
    }

    useEffect(()=> {
        let timeout;
        if (nextMove !== null && nextMove === players.ai && gameState !== GAME_STATUS.over) {
            timeout = setTimeout(() => aiMove(), 500);
        }
        return () => timeout && clearTimeout(timeout);
    }, [nextMove, gameState, aiMove, players.ai])
    
    useEffect(() => {
        const boardWinner = board.getWinner(grid);
        const declareWinner = (winner) => {
          let winnerStr = "";
          switch (winner) {
            case PLAYER_X:
              winnerStr = "Player X wins!";
              break;
            case PLAYER_O:
              winnerStr = "Player O wins!";
              break;
            case DRAW:
            default:
              winnerStr = "It's a draw";
          }
          setGameState(GAME_STATUS.over);
          setWinner(winnerStr);
        };
     
        if (boardWinner !== null && gameState !== GAME_STATUS.over) {
          declareWinner(boardWinner);
        }
    }, [gameState, grid, nextMove]);

    
    useEffect(() => {
        console.log(winner);
    }, [winner]);
    

    switch(gameState){
        case GAME_STATUS.notStarted:
            default:
                return(
                        <div className="flex justify-center items-center h-screen flex-col">
                            <p>Choose your player</p>
                            <div>
                              <ButtonRow>
                              <Button onClick={() => choosePlayer(PLAYER_X)}>X</Button>
                              <p>or</p>
                              <Button onClick={() => choosePlayer(PLAYER_O)}>O</Button>
                              </ButtonRow>
                            </div>
                        </div>

                );
        case GAME_STATUS.inProgress:
            return(
                <Wrapper>
                  <Container dims={DIMENSIONS}>
                      {grid.map((value, index) => {
                      const isActive = value !== null;
                      return (
                          <Square key={index} onClick={() => humanMove(index)}>
                          {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
                          </Square>
                      );
                      })}
                  </Container>
                </Wrapper>
              );
        case GAME_STATUS.over:
            return(
              <div>
                <div className="flex justify-center items-center h-screen flex-col">
                    <p>{winner}</p>
                    <Button onClick={startNewGame}>Start over</Button>
                </div>
              </div>
            );
    }
  }
  
  const Wrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
`;

  const Container = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    width: ${(props) => `${props.dims * (SQUARE_DIMS + 5)}px`};
    position: relative;
  `;
   
  const Square = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${SQUARE_DIMS}px;
    height: ${SQUARE_DIMS}px;
    border: 1px solid white;
   
    &:hover {
      cursor: pointer;
    }
  `;
   
  const Marker = styled.p`
    font-size: 68px;
    color: white;
  `;
  const ButtonRow = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
`;
 
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export default TicTacToe;
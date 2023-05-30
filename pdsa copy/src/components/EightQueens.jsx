import { useEffect, useState, useCallback } from "react";
import styled from "styled-components"
import QueenHandler from "../dsa/NQueens";
import Popup from "../Popup";
import { useNavigate } from "react-router-dom";

const DIMENSIONS = 8;
const SQUARE_DIMS = 75;

const GAME_STATUS = {
    inProgress: "in_progress",
    over: "over"
}

let flag = true;
let color;

const emptyGrid =  [];
const handler = new QueenHandler();

for (let i = 0; i < DIMENSIONS; i++) {
    const row = []
    for (let j = 0; j < DIMENSIONS; j++) {
      row.push(0);
    }
    emptyGrid.push(row);
}

const EightQueens = ()=> {
    
    const [name, setName] = useState(null);

    const [grid, setGrid] = useState(emptyGrid);
    const [moves, setMoves] = useState(DIMENSIONS);
    const [solutions, setSolutions] = useState(96);
    const [gameState, setGameState] = useState(GAME_STATUS.inProgress);

    const nav = useNavigate();
    
    const HandleMove = (row, col) => {
        const cloned_grid = clone(grid);
        if(grid[row][col] == 1){
            cloned_grid[row][col] = 0;
            setGrid(cloned_grid);
            setMoves(moves + 1);
        }
        else{
            const status = handler.checkMove(cloned_grid, row, col);
            if(status){
                setGrid(cloned_grid);
                setMoves(moves - 1);
            }
        }
    }

    const clone = (mat) => {
        const new_mat = [];
        for(let i = 0; i < mat.length; i++){
            const tmp_row = [];
            for(let j = 0; j < mat.length; j++){
                tmp_row.push(mat[i][j]);
            }
            new_mat.push(tmp_row);
        }
        return new_mat;
    }

    const resetGrid = () => {
        const new_mat = [];
        for(let i = 0; i < grid.length; i++){
            const tmp_row = [];
            for(let j = 0; j < grid.length; j++){
                tmp_row.push(0);
            }
            new_mat.push(tmp_row);
        }
        return new_mat;        
    }

    const handleConfirm = (val) => {
        setName(val);
    }

    useEffect(() => {
        if(moves == 0){
            setSolutions(solutions - 1);
            setGrid(resetGrid());
        }
        if (solutions == 0){
            nav(-1);
        }
    }, [moves]);

    if(name){
        switch(gameState){
            case GAME_STATUS.inProgress:
                default:
                return(
                    <Wrapper>
                    <Container dims={DIMENSIONS}>
                        {grid.map((row, i) => {
                            if((i +1) % 2){
                                flag = true;
                            }
                            else {
                                flag = false;
                            }
                            return (
                                row.map((col, j) => {
                                    if(flag){
                                        color = "white";
                                        flag = !flag;
                                    }
                                    else {
                                        color = "black";
                                        flag = !flag;
                                    }
                                    if(col){
                                        return(
                                            <Square key={j} color="red" onClick={() => HandleMove(i, j)}></Square>
                                        );
                                    }
                                    else {
                                        return(
                                            <Square key={j} color={color} onClick={() => HandleMove(i, j)}></Square>
                                        );
                                    }
                                })
                            );
                        })}
                    </Container>
                    <Container2>
                        <div className="m-1">
                            Solutions = {solutions}
                        </div>
                        <div className="m-1">
                            moves = {moves}
                        </div>
                    </Container2>
                    </Wrapper>
                );
            case GAME_STATUS.over:
                return(
                    <div>
                        <p>df</p>
                        <button>Start over</button>
                    </div>
                );
        }
    }
    else{
        return (
            <Popup handleConfirm={handleConfirm} />
        )
    }
  }
  
  const Wrapper = styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: white;
`;

  const Container = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    width: ${(props) => `${props.dims * (SQUARE_DIMS + 5)}px`};
    position: relative;
  `;
 
  const Container2 = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  width: 200px;
  height: 250px;
  position: relative;
  margin-top: 3px;
  `; 
   
  const Square = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${SQUARE_DIMS}px;
    height: ${SQUARE_DIMS}px;
    border: 1px solid black;
    background-color: ${(props) => props.color};

    &:hover {
      cursor: pointer;
    }
  `;

export default EightQueens;
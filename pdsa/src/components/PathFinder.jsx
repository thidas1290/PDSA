import { useState, useEffect } from "react";
import Popup from "../Popup";
import Graph from "../dsa/Graph";
import { styled } from "styled-components";

const SQUARE_DIMS = 40;
const DIM = 10;
const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const PathFinder = () => {

    const [name, setName] = useState(null);
    const [distance, setDistance] = useState(null);
    const [paths, setPaths] = useState(null);
    const [start_node, setStart_node] = useState(null);
    const [data, setData] = useState([
        []
      ]);

    useEffect(()=>{
        const graph = new Graph(DIM, 5, 50);
        const new_data = graph.getMat();
        for (let row = 0; row < new_data.length; row++) {
            for(let col = 0 ; col < new_data.length; col++){
                if(row == col)
                {
                    new_data[row][col] = "_";
                }
                if(col > row)
                {
                    new_data[row][col] = "";
                }
            }
        }

        for(let i = 0; i < new_data.length; i ++){
            new_data[i].unshift(ALPHABET[i]);            
        }
        const final_addition = [];
        for(let i = 0; i < new_data[0].length; i++){
            if(i == 0)
            {
                final_addition[i] = ""
            }
            else
            {
                final_addition[i] = ALPHABET[i - 1];
            }
        }
        new_data.push(final_addition);
        setData(new_data);
        const [new_dist, new_paths] = graph.dsp();
        setDistance(new_dist);
        setPaths(new_paths);
        setStart_node(graph.getStart());
    }, [name])


    const handleConfirm = (val) => {
        setName(val);
    }

    if (!name) {
        return (
            <Popup handleConfirm={handleConfirm} />
        )
    }
    else {
        return (
            <>
                <Wrapper>
                    <Container dims={DIM + 1}>
                        {data.map((row, i)=>{
                            return(
                            row.map((node, j)=>{
                                if(j == 0 || i == DIM){
                                    return(
                                        <Square key={j}>{node}</Square>
                                    );
                                }else{
                                    return(
                                        <Square key={j} border={1}>
                                            {node}
                                        </Square>
                                    );
                                }
                            })
                        );
                        })}
                        
                    </Container>
                    <Container dims={DIM}>
                        {paths.map((path, x) => [
                            
                        ])}
                    </Container>
                </Wrapper>
            </>
        )
    }
}

const Wrapper = styled.main`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-color: white;
flex-direction: column;
`;

const Container = styled.div`
display: flex;
flex-flow: wrap;
justify-content: center;
width: ${(props) => `${props.dims * (SQUARE_DIMS + 1)}px`};
position: relative;
margin-top: 300px;
`;

const Square = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: ${SQUARE_DIMS}px;
height: ${SQUARE_DIMS}px;
border: ${(props) => `${props.border}px solid black`};

&:hover {
  cursor: pointer;
}
`;



export default PathFinder;


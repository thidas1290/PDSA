import { useState, useEffect } from "react";
import Popup from "../Popup";
import Graph from "../dsa/Graph";
import { styled } from "styled-components";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SQUARE_DIMS = 40;
const DIM = 10;
const alphabetMap = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
    'i': 8,
    'j': 9,
};

const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const MinimumSpanningTree = () => {

    const [name, setName] = useState(null);
    const [distance, setDistance] = useState();
    const [distance_, setDistance_] = useState();
    const [path, setPath] = useState([]);
    const [path_, setPath_] = useState([]);
    const [start_node, setStart_node] = useState(null);
    const [data, setData] = useState([
        []
      ]);

     const nav = useNavigate() ;

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

        // const [new_dist, new_path] = graph.dsp();
        // setStart_node(graph.getStart())
    }, [])

    const clickHandler = () => {
        const alphaRegex = /^([a-jA-J],)*[a-jA-J]$/;
        const numericalRegex = /^[0-9]+$/;
        if(alphaRegex.test(path_) && numericalRegex.test(distance_)){
            const path_matcher = [];
            const splitted_arr = path_.split(",");
            console.log(splitted_arr);
            if(splitted_arr.length == path.length){
                splitted_arr.map(c => {
                    path_matcher.push(alphabetMap[c]);
                });
                console.log(path_matcher, paths[index]);
                let flag = true;
                for(let i = 0; i < path.length; i ++){
                    if(path[i] != path_matcher[i]){
                        alert("Invalid Path !");
                        flag = false
                        break;
                    }
                }
                console.log(flag, path_matcher)
                console.log(parseInt(distance_), parseInt(distance))
                if(flag && (distance_ == distance)){
                    alert("correct Answer");


                }
            }
            else {
                alert("Invalid Path ");    
            }
        }
        else{
            alert("Invalid Path (regex_err)");
        }
    }


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
                    <Container2 >
                    <div className="flex justify-center items-center">
                                    <Input
                                        label="shortest Path"
                                        onChange={e => {
                                            setPath_(e.target.value);
                                        }}
                                    />
                                    <Input
                                        label="distance"
                                        onChange={e => {
                                            setDistance_(e.target.value);
                                        }}
                                    />
                                    <Button
                                        onClick={() => clickHandler()}
                                    >
                                        check
                                    </Button>
                                </div>
                    </Container2>
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
    border: ${(props) => `${props.border}px solid black`};

    &:hover {
    cursor: pointer;
    }
`;



export default MinimumSpanningTree;


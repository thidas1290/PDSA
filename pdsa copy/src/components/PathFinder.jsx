import { useState, useEffect } from "react";
import Popup from "../Popup";
import Graph from "../dsa/Graph";
import { styled } from "styled-components";
import { Button, Input } from "@material-tailwind/react";

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

const PathFinder = () => {

    const [name, setName] = useState(null);
    const [distance, setDistance] = useState([]);
    const [distance_, setDistance_] = useState([]);
    const [paths, setPaths] = useState([]);
    const [paths_, setPaths_] = useState([]);
    const [start_node, setStart_node] = useState();
    const [button, setButton] = useState(new Array(10).fill(true));

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
        const [new_dist, new_path] = graph.mst();
        setDistance(new_dist);
        setPaths(new_path);
        setStart_node(graph.getStart());
    }, [])

    useEffect(() => {
        setButton(new Array(paths.length).fill(false));
    }, [paths])


    const handleConfirm = (val) => {
        setName(val);
    }

    const clickHandler = (index) => {
        const alphaRegex = /^([a-jA-J],)*[a-jA-J]$/;
        const numericalRegex = /^[0-9]+$/;
        if(alphaRegex.test(paths_[index]) && numericalRegex.test(distance_[index])){
            const path_matcher = [];
            const splitted_arr = paths_[index].split(",");
            console.log(splitted_arr);
            if(splitted_arr.length == paths[index].length){
                splitted_arr.map(c => {
                    path_matcher.push(alphabetMap[c]);
                })
                console.log(path_matcher, paths[index]);
                let flag = true;
                for(let i = 0; i < paths[index].length; i ++){
                    if(paths[index][i] != path_matcher[i]){
                        alert("Invalid Path !");
                        flag = false
                        break;
                    }
                }
                console.log(flag, path_matcher)
                console.log(parseInt(distance_[index]), parseInt(distance[index]))
                if(flag && (distance_[index] == distance[index])){
                    alert("correct Answer");
                    button[index] = true;
                    setButton([...button]);

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

    useEffect(() => {
        // console.log(paths_)
        console.log("paths - ", paths)
        console.log("distance - ", distance)
    }, [paths])

    if (!name) {
        return (
            <Popup handleConfirm={handleConfirm} />
        )
    }
    else {
        return (
            <>
                <Wrapper>
                    <h1>Selected City : {ALPHABET[start_node]}</h1>
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
                    {/* <div className="flex  justify-center items-center w-100 h-100"> */}
                    <Container2>
                        {paths.map((path, x) => {
                            return(
                                <div key={x} className="flex justify-center items-center">
                                    <Input
                                        disabled={button[x]}
                                        label={`path for ${ALPHABET[x]}`}
                                        onChange={e => {
                                            paths_[x] = e.target.value;
                                            setPaths_([...paths_]);
                                        }}
                                    />
                                    <Input
                                        disabled={button[x]}
                                        label="distance"
                                        onChange={e => {
                                            distance_[x] = e.target.value;
                                            setDistance_([...distance_]);
                                        }}
                                    />
                                    <Button
                                        disabled={button[x]}
                                        onClick={() => clickHandler(x)}
                                    >
                                        check
                                    </Button>
                                </div>
                            )
                        })}
                    {/* </div> */}
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
margin-top: 3px;
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



export default PathFinder;


import { useState, useEffect } from "react";
import HuffmanEncoder from "../dsa/Huffman_enc_dec";
import { styled } from "styled-components";
import { Button, Input } from "@material-tailwind/react";

const SQUARE_DIMS = 50;


const Huffman = ()=> {
    const [encoderValue, setEncoderValue] = useState("");
    const [encoderInput, setEncoderInput] = useState("");
    const [decoderValue, setDecoderValue] = useState(["", ""]);
    const [decoderInput, setDecoderInput] = useState("");

    const [encColor, setEncColor] = useState("blue");
    const [decColor, setDecColor] = useState("blue");

    const [trigger, setTrigger] = useState(true);

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const onDecode = () => {
        const binaryRegex = /^[01]+$/;
        if(binaryRegex.test(encoderInput)){
            const obj = new HuffmanEncoder(encoderValue, true);
            const decoded_ = obj.encoded

            if(decoded_ == encoderInput){
                alert("Correct answer !");
                setTrigger(!trigger);
            }
            else {
                alert("Incorrect Answer!");
                setEncoderInput("");
            }
        }
        else{
            setEncoderInput("");
            setDecColor("red");
            
        }
    }

    const onEncode = () => {
        const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
        if(alphaNumericRegex.test(decoderInput)){
            const obj = new HuffmanEncoder(decoderValue[1], true);
            if(decoderInput == decoderValue[1]){
                alert("Correct answer !");
                setTrigger(!trigger);
            }
            else {
                alert("Incorrect Answer!");
                setDecoderInput("");
            }
        }
        else{
            setDecoderInput("");
            setEncColor("red");
        }
    }

    useEffect(() => {
        const random_str = generateRandomString(30);
        const decoder = new HuffmanEncoder(random_str, true);
        const encoder = new HuffmanEncoder(random_str, true);
        setEncoderValue(random_str.slice());
        setDecoderValue([decoder.encoded.slice(), random_str.slice()]);

    }, []);

    useEffect(() => {
        const random_str = generateRandomString(30);
        const decoder = new HuffmanEncoder(random_str, true);
        setEncoderValue(random_str.slice());
        setDecoderValue([decoder.encoded.slice(), random_str.slice()]);

    }, [trigger]);   

    useEffect(() => {
        console.log(decoderValue[0]);
    }, [decoderValue])
    
    return(
        <Wrapper>
            <Container>
                <Square>
                    <div>Decoder</div>
                    <div className="h-36 flex justify-center items-center">{encoderValue}</div>
                    <Input
                        label="Enter coded value"
                        color={decColor}
                        onChange={(e) =>{
                            setEncoderInput(e.target.value);
                            setDecColor("blue");
                        }}
                        value={encoderInput}
                    />
                    <Button
                        onClick={onDecode}>
                        Decode
                    </Button>
                </Square>
                <Square>
                    <h1>Encoder</h1>
                    <div className="w-80 h-36 overflow-auto flex justify-center items-center">{decoderValue[0]}</div>
                    <Input
                        label="Enter string value"
                        onChange={(e) =>{
                            setDecoderInput(e.target.value);
                            setEncColor("blue");
                        }}
                        value={decoderInput}
                        color={encColor}
                    />
                    <Button
                        onClick={onEncode}>
                        Encode
                    </Button>                    
                </Square>
            </Container>
        </Wrapper>
    )
}
const Wrapper = styled.main`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-color: white;
`;

const Container = styled.div`
display: flex;
flex-flow: wrap;
justify-content: center;
// width: ${(props) => `${props.dims * (SQUARE_DIMS + 5)}px`};
width: 450px;
position: relative;
`;

const Square = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 400px;
height: 200px;
border: 1px solid white;
background-color: ${(props) => props.color};

`;
export default Huffman;
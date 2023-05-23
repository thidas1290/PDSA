import { useState, useEffect } from "react";
import Popup from "./Popup";

const PathFinder = ()=> {
    const arr = Array.from([1,2,3,4,5,6,7,8,9]);
    
    const [name, setName] = useState(null);

    const handleConfirm = (val) => {
        setName(val);
    }

    useEffect(() => {
    }, [])

    if(!name){
        return(
            <Popup handleConfirm={handleConfirm} />
        )

    }
    else {
        return(
            <h1>{name}</h1>
        )
    }
}

export default PathFinder;


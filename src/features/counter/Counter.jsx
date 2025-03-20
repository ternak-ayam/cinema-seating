import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export default function Counter() {
    const count = useSelector((state)=> state.counter.value);
    const dispacth = useDispatch();

    return (
        <div className="flex gap-2 h-10 items-center"> 
            <button 
                className="p-2 rounded-md bg-blue-300"
                onClick={() => dispacth(increment())}    
            > + </button>
            <span>{count}</span>
            <button 
                className="p-2 rounded-md bg-red-300"
                onClick={()=> dispacth(decrement())}
            > - </button>

        </div>
    )
}
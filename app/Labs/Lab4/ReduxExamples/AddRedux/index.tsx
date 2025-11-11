"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { RootState } from "../../store";
import { FormControl, Button } from "react-bootstrap"; // Make sure to import these

export default function AddRedux() {
  // 1. Component state for the input fields
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  
  // 2. Read the "sum" from the Redux store
  const { sum } = useSelector((state: RootState) => state.addReducer);
  
  // 3. Get the dispatch function
  const dispatch = useDispatch();
  
  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl type="number" defaultValue={a}
        onChange={(e) => setA(parseInt(e.target.value))} />
      <FormControl type="number" defaultValue={b}
        onChange={(e) => setB(parseInt(e.target.value))} />
      <Button id="wd-add-redux-click"
              className="mt-2" // Added margin for spacing
              onClick={() => dispatch(add({ a, b }))}>
        Add Redux
      </Button>
      <hr/>
    </div>
  );
}
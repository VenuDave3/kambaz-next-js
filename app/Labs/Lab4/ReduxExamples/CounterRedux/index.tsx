"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer"; // 1. Import the actions
import { RootState } from "../../store";

export default function CounterRedux() {
  // 2. Read the "count" from the specific reducer
  const { count } = useSelector((state: RootState) => state.counterReducer);
  
  // 3. Get the dispatch function
  const dispatch = useDispatch();
  
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      {/* 4. Call dispatch() with the action when clicked */}
      <button onClick={() => dispatch(increment())} id="wd-counter-redux-increment-click"> Increment </button>
      <button onClick={() => dispatch(decrement())} id="wd-counter-redux-decrement-click"> Decrement </button>
      <hr/>
    </div>
  );
}
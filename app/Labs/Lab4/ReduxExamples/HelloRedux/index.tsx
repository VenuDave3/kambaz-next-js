"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function HelloRedux() {
  // 1. Use "useSelector" hook to read from the store
  const { message } = useSelector((state: RootState) => state.helloReducer);
  
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      {/* 2. Display the message from the store */}
      <h4>{message}</h4> <hr />
    </div>
  );
}
"use client";
import { useState } from "react"; // 1. Import useState
export default function Counter() {
  // 2. Use useState to declare the state variable
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      {/* 3. Use the setter function to update the state */}
      <button onClick={() => setCount(count + 1)}
              id="wd-counter-up-click">Up</button>
      {/* 4. Use the setter function to update the state */}
      <button onClick={() => setCount(count - 1)}
              id="wd-counter-down-click">Down</button>
      <hr/>
    </div>
  );
}
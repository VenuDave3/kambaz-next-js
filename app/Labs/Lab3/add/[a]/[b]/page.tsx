// app/Labs/Lab3/add/[a]/[b]/page.tsx

"use client" // This hook requires a Client Component
import { useParams } from "next/navigation";

export default function AddPathParameters() {
  // useParams() returns an object where keys are the dynamic segments: 'a' and 'b'
  const { a, b } = useParams();

  // The values from useParams are 'string | string[]' (or undefined).
  // We assert them as 'string' with (a as string) for clarity and then parse them to integers.
  return (
    <div id="wd-add"> 
      <h4>Add Path Parameters</h4>
      {a} + {b} = {parseInt(a as string) + parseInt(b as string)}
    </div>
  );
}
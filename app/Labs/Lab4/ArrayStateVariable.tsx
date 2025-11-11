/* eslint-disable */
"use client";
import { useState } from "react";
// --- NEW IMPORTS ---
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";
// --- END NEW IMPORTS ---

export default function ArrayStateVariable() {
  // --- NEW CODE ---
  // Get the todos from the Redux store
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  // --- END NEW CODE ---

  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success">
        Add Element
      </button>
      <ul className="list-group my-2">
        {array.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item}
            <button onClick={() => deleteElement(index)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* --- NEW CODE --- */}
      {/* Display the global todos list here */}
      <h3 className="mt-4">Todos from Redux</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      {/* --- END NEW CODE --- */}

      <hr />
    </div>
  );
}
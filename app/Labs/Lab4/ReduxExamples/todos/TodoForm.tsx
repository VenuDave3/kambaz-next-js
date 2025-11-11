"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";

export default function TodoForm() {
  // Get the 'todo' state from the Redux store
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch(); // Get the dispatch function

  return (
    <ListGroupItem>
      {/* Dispatch actions directly */}
      <Button onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click" variant="success" className="me-2"> Add </Button>
      <Button onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click" variant="warning"> Update </Button>
      <FormControl
        value={todo.title} // Use value instead of defaultValue
        className="mt-2"
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </ListGroupItem>
  );
}
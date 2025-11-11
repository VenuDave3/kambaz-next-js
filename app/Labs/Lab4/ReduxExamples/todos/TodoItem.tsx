"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem } from "react-bootstrap";

// Note: We still pass 'todo' as a prop, but not the functions
export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click" variant="danger" className="me-2"> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click" variant="primary" className="me-2"> Edit </Button>
      {todo.title}
    </ListGroupItem>
  );
}
/* eslint-disable */
"use client";
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ListGroup } from "react-bootstrap";

export default function TodoList() {
  // Get the 'todos' array from the Redux store
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        
      </ListGroup>
      <hr/>
    </div>
  );
}
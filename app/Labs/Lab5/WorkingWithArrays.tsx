"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      
      {/* ----- GIVEN CODE (5.2.4.1) ----- */}
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos 
      </a><hr/>

      {/* ----- GIVEN CODE (5.2.4.2) ----- */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl id="wd-todo-id" value={todo.id} className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />
      
      {/* ----- GIVEN CODE (5.2.4.3) ----- */}
      <h3>Filtering Array Items</h3>
      <a id="wd-retrieve-completed-todos" className="btn btn-primary"
         href={`${API}?completed=true`}>
        Get Completed Todos
      </a><hr/>
      
      {/* ----- GIVEN CODE (5.2.4.4) ----- */}
      <h3>Creating new Items in an Array</h3>
      <a id="wd-create-todo" className="btn btn-primary"
         href={`${API}/create`}>
        Create Todo
      </a><hr/>

      {/* ----- GIVEN CODE (5.2.4.5) ----- */}
      <h3>Removing from an Array</h3>
      <a id="wd-remove-todo" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
        Remove Todo with ID = {todo.id} 
      </a>
      <FormControl value={todo.id} className="w-50" 
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/><hr/>

      {/* ----- GIVEN CODE (5.2.4.6) ----- */}
      <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
        Update Todo
      </a>
      <FormControl value={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      <FormControl value={todo.title} className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value }) }/>
      <br /><br /><hr />

      {/* ----- "ON YOUR OWN" (5.2.4.7) ----- */}
      <h3>Updating Completed Status</h3>
      <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary float-end"
         id="wd-update-completed-todo">
        Complete Todo ID = {todo.id}
      </a>
      <input type="checkbox" className="form-check-input"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <br /><br /><hr />
      
      <h3>Updating Description</h3>
      <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end"
         id="wd-update-description-todo">
        Describe Todo ID = {todo.id}
      </a>
      <FormControl value={todo.description} className="w-75"
        onChange={(e) => setTodo({ ...todo, description: e.target.value }) }/>
      <br /><br /><hr />
      {/* ----- END "ON YOUR OWN" ----- */}
    </div>
  );
}
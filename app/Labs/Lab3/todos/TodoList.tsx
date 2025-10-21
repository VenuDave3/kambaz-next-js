import TodoItem from "./TodoItem";
import todosData from "./todos.json";

// Match the shape used in TodoItem
interface Todo {
  done: boolean;
  title: string;
  status: string;
}

const todos: Todo[] = todosData as Todo[];

const TodoList = () => {
  return (
    <>
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
      <hr />
    </>
  );
};

export default TodoList;

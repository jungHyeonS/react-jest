import { useState } from "react";

interface TodoItem {
  value: string;
  isDone: boolean;
  isDel: boolean;
}

function Todo() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState<TodoItem[]>([]);

  const handleAddTodo = () => {
    setTodo([
      ...todo,
      {
        value: value,
        isDone: false,
        isDel: false,
      },
    ]);
    setValue("");
  };

  return (
    <>
      <input
        type="text"
        value={value}
        placeholder="add To do"
        onClick={handleAddTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button>추가</button>
      <ul>
        {todo.map((todo: TodoItem) => (
          <li>{todo.value}</li>
        ))}
      </ul>
    </>
  );
}
export default Todo;

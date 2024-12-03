import Todo from "@/types/types"
import axios from "axios"
import { Dispatch, SetStateAction } from 'react';

interface TodoListProps {
    todo: Todo;
    onTodoAdded: () => void;
}

function TodoItem ({todo,onTodoAdded}:TodoListProps){
    async function Switch(){
        todo.completed = !todo.completed
        try {
            // 发送 POST 请求添加新 todo
            await axios.patch('http://127.0.0.1:4000/api/todos'+"/"+todo.id);
          } catch (error) {
            console.error('Error switch todo:', error);
          }
          onTodoAdded();
        console.log("switch")
    }
    async function Delete(){
        todo.completed = !todo.completed
        try {
            // 发送 POST 请求添加新 todo
            await axios.delete('http://127.0.0.1:4000/api/todos'+"/"+todo.id);
          } catch (error) {
            console.error('Error switch todo:', error);
          }
        onTodoAdded();
        console.log("switch")
    }
    return (

    <li className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-3">
        <input 
          type="checkbox"
          checked={todo.completed}
          onChange={() => Switch()}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className={`text-gray-700 ${todo.completed ? 'line-through' : ''}`}>
          {todo.body}
        </span>
      </div>
      <button 
        onClick={() => Delete()}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        Delete
      </button>
    </li>
    )
}

export default TodoItem
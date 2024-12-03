import Todo from '@/types/types'
import TodoItem from './TodoItem';
import { Dispatch, SetStateAction } from 'react';

interface TodoListProps {
    todos: Todo[];
    onTodoAdded: () => void;
}
function TodoList({todos,onTodoAdded}:TodoListProps) {

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="divide-y divide-gray-200">
            {todos.map( (todo) => (
                    <TodoItem todo={todo} key={todo.id} onTodoAdded={onTodoAdded}/>
            ))}
            
        </ul>
        </div>
        
    );
}

export default TodoList
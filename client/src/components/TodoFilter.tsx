import { Dispatch, SetStateAction } from 'react';

interface TodoFilterProps {
  setFilter: Dispatch<SetStateAction<string>>;
}

function TodoFilter(filter: TodoFilterProps) {
    const AllTodo = () => {
        filter.setFilter("all")
    }
    const ActiveTodo = () => {
        filter.setFilter("not completed")
    }
    const CompletedTodo = () => {
        filter.setFilter("completed")
    }
    return (
        <div className="flex space-x-4">
            <button onClick={AllTodo} className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">ALL</button>
            <button onClick={ActiveTodo} className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">ACTIVE</button>
            <button onClick={CompletedTodo} className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">COMPLETED</button>
        </div>
    )
}


export default TodoFilter
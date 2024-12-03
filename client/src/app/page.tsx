'use client';
import AddTodo from '@/components/AddTodo';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';

import axios from "axios";
import { useState, useEffect } from 'react';
import  Todo  from '../types/types';
import { serialize } from 'v8';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");

  // 定义一个函数来获取 todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // 使用 useEffect 在组件挂载时获取数据
  useEffect(() => {
    fetchTodos();
  }, []);


  // 定义一个函数来过滤 todos
  function getFilteredTodos(): Todo[] {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "not completed":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Todo List</h1>
      <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
        <TodoList todos={getFilteredTodos()} onTodoAdded={fetchTodos} />
        <AddTodo onTodoAdded={fetchTodos} />
        <TodoFilter setFilter={setFilter}/>
      </div>
      </div>
    </div>
  );
}
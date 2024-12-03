'use client';
import { useState } from 'react';
import axios from 'axios';

function AddTodo({ onTodoAdded }: { onTodoAdded: () => void }) {
  const [text, setText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // 发送 POST 请求添加新 todo
      await axios.post('http://127.0.0.1:4000/api/todos', {
        body: text.trim(),
      });

      setText(''); // 清空输入框

      // 调用父组件传递下来的函数，重新获取 todos
      onTodoAdded();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
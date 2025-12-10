'use client';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string, completed: boolean) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-gray-500">Get started by adding your first task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id, todo.completed)}
            className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />

          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium text-gray-900 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`text-sm mt-1 ${
                  todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-600'
                }`}
              >
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              {formatDate(todo.created_at)}
            </p>
          </div>

          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Delete task"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';

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
  const [expandedCompletedTask, setExpandedCompletedTask] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Separate active and completed tasks
  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No tasks yet</h3>
        <p className="mt-2 text-gray-500">Get started by adding your first task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Tasks Section */}
      {activeTodos.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Active Tasks ({activeTodos.length})
            </h2>
          </div>
          <div className="space-y-3">
            {activeTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow border border-blue-100 group"
              >
                <button
                  onClick={() => onToggleTodo(todo.id, todo.completed)}
                  className="mt-1 h-6 w-6 rounded-full border-2 border-blue-400 flex items-center justify-center hover:bg-blue-50 transition-colors flex-shrink-0"
                  title="Mark as complete"
                >
                  <svg
                    className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base leading-tight">
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {todo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2a2 2 0 11-4 0V9a2 2 0 012-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{formatDate(todo.created_at)} at {formatTime(todo.created_at)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
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
        </div>
      )}

      {/* Completed Tasks Section */}
      {completedTodos.length > 0 && (
        <div>
          <button
            onClick={() => setExpandedCompletedTask(expandedCompletedTask ? null : 'show')}
            className="flex items-center gap-3 mb-4 hover:opacity-75 transition-opacity"
          >
            <div className="h-1 w-1 bg-green-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Completed ({completedTodos.length})
            </h2>
            <svg
              className={`h-4 w-4 text-gray-500 transition-transform ${
                expandedCompletedTask ? 'rotate-180' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {expandedCompletedTask && (
            <div className="space-y-3">
              {completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-200 group"
                >
                  <button
                    onClick={() => onToggleTodo(todo.id, todo.completed)}
                    className="mt-1 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0"
                    title="Mark as incomplete"
                  >
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-400 text-base line-through leading-tight">
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2 line-through">
                        {todo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2a2 2 0 11-4 0V9a2 2 0 012-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{formatDate(todo.created_at)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
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
          )}
        </div>
      )}
    </div>
  );
}

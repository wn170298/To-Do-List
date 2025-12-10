"use client";

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    // Create the Supabase client lazily on the client
    const supabase = getSupabase();
    fetchTodos(supabase);

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        () => {
          fetchTodos(supabase);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTodos = async (supabaseClient?: any) => {
    const supabase = supabaseClient ?? getSupabase();
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setTodos(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch todos';
      setError(errorMessage);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const supabase = getSupabase();
      const { error: insertError } = await supabase
        .from('todos')
        .insert([{ title, description, completed: false }]);

      if (insertError) throw insertError;
      await fetchTodos(supabase);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add todo';
      setError(errorMessage);
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const supabase = getSupabase();
      const { error: updateError } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);

      if (updateError) throw updateError;
      await fetchTodos(supabase);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
      console.error('Error toggling todo:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const supabase = getSupabase();
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchTodos(supabase);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMessage);
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">My To-Do List</h1>
                <p className="text-blue-100 mt-1">Stay organized and productive</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Tasks</div>
                <div className="text-2xl font-semibold text-white">{todos.length}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <TodoForm onAddTodo={addTodo} />

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            setAdding(true);
            try {
              const supabase = getSupabase();

              // return the inserted row so we can update UI immediately
              const { data, error: insertError } = await supabase
                .from('todos')
                .insert([{ title, description, completed: false }])
                .select()
                .single();

              if (insertError) throw insertError;

              // If we got the created row back, prepend it to UI immediately
              if (data) {
                setTodos((prev) => [data as Todo, ...prev]);
                return;
              }

              // Fallback: re-fetch all todos
              await fetchTodos(supabase);
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : 'Failed to add todo';
              setError(errorMessage);
              console.error('Error adding todo:', err);
              // clear error after a short delay so the UI isn't blocked forever
              setTimeout(() => setError(null), 6000);
            } finally {
              setAdding(false);
            }
        </footer>
      </div>
    </main>
  );
}

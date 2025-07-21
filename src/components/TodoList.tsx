import React from 'react';
import { Todo } from '@/hooks/useTodos';
import TodoItem from './TodoItem';
import { Card, CardContent } from '@/components/ui/card';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Loading todos...</p>
        </CardContent>
      </Card>
    );
  }

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No todos yet. Create your first one above!</p>
        </CardContent>
      </Card>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="space-y-6">
      {activeTodos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Active Todos ({activeTodos.length})</h2>
          <div className="space-y-3">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Completed Todos ({completedTodos.length})</h2>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
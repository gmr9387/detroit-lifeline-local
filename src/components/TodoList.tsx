import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Clock, AlertTriangle, CheckCircle, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TodoItem } from '@/types';
import { storageUtils } from '@/utils/localStorage';

interface TodoListProps {
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({ className }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
    category: TodoItem['category'];
    dueDate: Date | undefined;
  }>({
    title: '',
    description: '',
    category: 'routine',
    dueDate: undefined
  });

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    const savedTodos = storageUtils.getTodoItems();
    setTodos(savedTodos);
  };

  const resetForm = () => {
    setNewTodo({
      title: '',
      description: '',
      category: 'routine',
      dueDate: undefined
    });
    setEditingTodo(null);
  };

  const handleAddTodo = () => {
    if (!newTodo.title.trim()) return;

    const todo: TodoItem = {
      id: editingTodo?.id || `todo_${Date.now()}`,
      title: newTodo.title.trim(),
      description: newTodo.description.trim() || undefined,
      completed: editingTodo?.completed || false,
      category: newTodo.category,
      dueDate: newTodo.dueDate?.toISOString(),
      createdAt: editingTodo?.createdAt || new Date().toISOString()
    };

    storageUtils.saveTodoItem(todo);
    loadTodos();
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
    setNewTodo({
      title: todo.title,
      description: todo.description || '',
      category: todo.category,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
    });
    setIsAddDialogOpen(true);
  };

  const handleToggleComplete = (todoId: string) => {
    storageUtils.toggleTodoComplete(todoId);
    loadTodos();
  };

  const handleDeleteTodo = (todoId: string) => {
    storageUtils.deleteTodoItem(todoId);
    loadTodos();
  };

  const getCategoryIcon = (category: TodoItem['category']) => {
    switch (category) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'important':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'routine':
        return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getCategoryBadge = (category: TodoItem['category']) => {
    const config = {
      urgent: { label: 'Urgent', variant: 'destructive' as const },
      important: { label: 'Important', variant: 'default' as const },
      routine: { label: 'Routine', variant: 'secondary' as const }
    };
    
    const { label, variant } = config[category];
    return <Badge variant={variant} className="text-xs">{label}</Badge>;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedTodos = [...todos].sort((a, b) => {
    // Incomplete first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by category priority
    const categoryPriority = { urgent: 0, important: 1, routine: 2 };
    if (a.category !== b.category) {
      return categoryPriority[a.category] - categoryPriority[b.category];
    }
    
    // Then by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Finally by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const incompleteTodos = sortedTodos.filter(todo => !todo.completed);
  const completedTodos = sortedTodos.filter(todo => todo.completed);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTodo ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add task details..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Priority</Label>
                <Select 
                  value={newTodo.category} 
                  onValueChange={(value: TodoItem['category']) => 
                    setNewTodo(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="routine">Routine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Due Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "mt-1 w-full justify-start text-left font-normal",
                        !newTodo.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTodo.dueDate ? format(newTodo.dueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newTodo.dueDate}
                      onSelect={(date) => setNewTodo(prev => ({ ...prev, dueDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {newTodo.dueDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewTodo(prev => ({ ...prev, dueDate: undefined }))}
                    className="mt-1 text-xs"
                  >
                    Clear date
                  </Button>
                )}
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handleAddTodo}
                  disabled={!newTodo.title.trim()}
                  className="flex-1"
                >
                  {editingTodo ? 'Update Task' : 'Add Task'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Tasks */}
      {incompleteTodos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Active Tasks ({incompleteTodos.length})</h3>
          {incompleteTodos.map((todo) => (
            <Card key={todo.id} className="card-elevated p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleComplete(todo.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getCategoryIcon(todo.category)}
                      <h4 className="font-medium truncate">{todo.title}</h4>
                      {getCategoryBadge(todo.category)}
                    </div>
                    {todo.description && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {todo.description}
                      </p>
                    )}
                    {todo.dueDate && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        <span>
                          Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}
                          {(() => {
                            const days = getDaysUntilDue(todo.dueDate);
                            if (days < 0) return <span className="text-destructive ml-1">(Overdue)</span>;
                            if (days === 0) return <span className="text-warning ml-1">(Due today)</span>;
                            if (days === 1) return <span className="text-warning ml-1">(Due tomorrow)</span>;
                            if (days <= 7) return <span className="text-warning ml-1">({days} days)</span>;
                            return <span className="ml-1">({days} days)</span>;
                          })()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTodo(todo)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Completed Tasks ({completedTodos.length})
          </h3>
          {completedTodos.map((todo) => (
            <Card key={todo.id} className="card-elevated p-4 opacity-60">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleComplete(todo.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <h4 className="font-medium truncate line-through">{todo.title}</h4>
                      {getCategoryBadge(todo.category)}
                    </div>
                    {todo.description && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2 line-through">
                        {todo.description}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {todos.length === 0 && (
        <Card className="card-elevated p-8 text-center">
          <div className="text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
            <p className="text-sm">
              Add your first task to get started with organizing your applications and goals.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TodoList;
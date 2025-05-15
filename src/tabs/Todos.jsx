import { nanoid } from 'nanoid';
import Form from '../components/Form/Form.jsx';
import TodoList from '../components/TodoList/TodoList.jsx';
import { useState, useEffect } from 'react';
import EditForm from '../components/EditForm/EditForm.jsx';

const Todos = () => {
  const getTodos = () => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  };
  const [todos, setTodos] = useState(getTodos);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const openEditForm = todo => {
    setEditingTodo(todo);
    setIsEditing(true);
  };
  const closeEditForm = () => {
    setIsEditing(false);
  };
  const addNewTodo = inputValue => {
    setTodos(prev => [...prev, { text: inputValue, id: nanoid() }]);
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const onSave = editedText => {
    const updatedTodos = todos.map(todo =>
      todo.id === editingTodo.id
        ? {
            ...todo,
            text: editedText,
          }
        : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
  };
  return (
    <>
      {isEditing && editingTodo ? (
        <EditForm
          onSave={onSave}
          onClose={closeEditForm}
          // id={editingTodo.id}
          defaultValue={editingTodo.text}
        />
      ) : (
        <Form onSubmit={addNewTodo} />
      )}

      <TodoList todos={todos} onDelete={deleteTodo} onOpen={openEditForm} />
    </>
  );
};

export default Todos;

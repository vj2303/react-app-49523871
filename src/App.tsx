import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Todo App</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      <ul style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} style={styles.todoItem}>
              <div style={styles.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#000',
                  }}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center' as const,
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '16px',
  },
  todoList: {
    listStyleType: 'none',
    padding: '0',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  todoContent: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  todoText: {
    fontSize: '16px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#888',
    fontStyle: 'italic',
  },
};

export default App;
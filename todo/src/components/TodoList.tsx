/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { authState } from '../store/authState';
import { useRecoilValue } from 'recoil';
import { Box, Button, Typography, TextField } from '@mui/material';
import { BASE_URL } from "../config.js";

interface Todo {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  subtasks?: Todo[];
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newSubtask, setNewSubtask] = useState<string>('');
  const authStateValue = useRecoilValue(authState);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(`${BASE_URL}/todo/todos`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.ok) {
          const data: Todo[] = await response.json();
          setTodos(data);
        } else {
          const errorData = await response.json();
          alert(`Error fetching todos: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todo/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const data: Todo = await response.json();
        setTodos([...todos, data]);
      } else {
        const errorData = await response.json();
        alert(`Error creating todo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const markDone = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to mark this todo as done?');

    if (confirmed) {
      try {
        const response = await fetch(`${BASE_URL}/todo/todos/${id}/done`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.ok) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
          alert('Todo marked as done and removed!');
        } else {
          const errorData = await response.json();
          alert(`Error marking todo as done: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error marking todo as done:', error);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h2>Welcome {authStateValue.username}</h2>
        <div style={{ marginTop: 25, marginLeft: 20 }}>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <h2>Todo List</h2>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <Box key={todo._id} sx={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px', marginBottom: '10px' }}>
          <Typography variant="h6">{todo.title}</Typography>
          <Typography variant="body1">{todo.description}</Typography>

          {/* Add Subtask Button - Move it above the Done button */}
          

          {/* Display Subtasks */}
          {todo.subtasks && todo.subtasks.length > 0 && (
            <div>
              <Typography variant="h6" style={{ color: 'blue' }}>
                Subtasks:
              </Typography>
              {todo.subtasks.map((subtask) => (
                <div key={subtask._id} style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Display Subtask Title */}
                  <Typography variant="body1" style={{ color: 'blue' }}>
                    {subtask.title}
                  </Typography>

                  {/* Edit Subtask Button */}
                  <Button
                    onClick={() => {
                      setSelectedTask(todo._id);
                      setNewSubtask(subtask.title || '');
                    }}
                    variant="outlined"
                    sx={{ marginLeft: '8px' }}
                  >
                    Edit
                  </Button>

                  {/* Update Subtask Input */}
                  {selectedTask === todo._id && (
                    <div style={{ marginLeft: '8px' }}>
                      <TextField
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        placeholder='New Subtask Title'
                      />
                     
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Mark as Done Button */}
          <Button onClick={() => markDone(todo._id)} variant="contained">
            {todo.done ? 'Done' : 'Mark as Done'}
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default TodoList;

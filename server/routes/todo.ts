import express from 'express';
import { authenticateJwt, SECRET } from '../middleware';
import { Todo, TodoDocument } from '../db';

const router = express.Router();

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt, (req, res) => {
  const inputs: CreateTodoInput = req.body;
  const done = false; // because when we create a todo, it's not initially done
  const userId = req.headers['userId'];

  const newTodo = new Todo({ title: inputs.title, description: inputs.description, done, userId });

  newTodo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create new todo' });
    });
});

router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers['userId'];

  Todo.find({ userId })
    .then((todos: TodoDocument[]) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to get todos' });
    });
});

router.put('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers['userId'];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

router.post('/todos/:todoId/subtasks', authenticateJwt, async (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers['userId'];
  const { title } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { $push: { subtasks: { title, done: false } } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Send the newly created subtask in the response
    const newSubtask = (updatedTodo.subtasks ?? []).pop(); // Use nullish coalescing here
    res.json(newSubtask);
  } catch (error) {
    console.error('Error creating subtask:', error);
    res.status(500).json({ error: 'Failed to create subtask' });
  }
});


export default router;

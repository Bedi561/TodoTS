import mongoose, { Document, Schema } from 'mongoose';

interface Subtask {
  title: string;
  done: boolean;
}

interface Todo {
  title: string;
  description: string;
  done: boolean;
  userId: mongoose.Types.ObjectId;
  subtasks?: Subtask[]; // Add this line for subtasks
}

interface TodoDocument extends Document {
  title: string;
  description: string;
  done: boolean;
  userId: mongoose.Types.ObjectId;
  subtasks?: Subtask[]; // Add this line for subtasks
}

const userSchema = new Schema({
  username: String,
  password: String,
});

const todoSchema = new Schema<TodoDocument>({
  title: String,
  description: String,
  done: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  subtasks: [{ title: String, done: Boolean }], // Add this line for subtasks
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model<TodoDocument>('Todo', todoSchema);

export { User, Todo, TodoDocument };

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const authState_1 = require("../store/authState");
const recoil_1 = require("recoil");
const TodoList = () => {
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [title, setTitle] = (0, react_1.useState)('');
    const [description, setDescription] = (0, react_1.useState)('');
    const authStateValue = (0, recoil_1.useRecoilValue)(authState_1.authState);
    (0, react_1.useEffect)(() => {
        const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3003/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = yield response.json();
            setTodos(data);
        });
        getTodos();
    }, []);
    const addTodo = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3003/todo/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ title, description }),
        });
        const data = yield response.json();
        setTodos([...todos, data]);
    });
    const markDone = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3003/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const updatedTodo = yield response.json();
        setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    });
    return (<div>
      <div style={{ display: 'flex' }}>
        <h2>Welcome {authStateValue.username}</h2>
        <div style={{ marginTop: 25, marginLeft: 20 }}>
          <button onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }}>
            Logout
          </button>
        </div>
      </div>
      <h2>Todo List</h2>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description'/>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (<div key={todo._id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
        </div>))}
    </div>);
};
exports.default = TodoList;

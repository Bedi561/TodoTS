"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const router = express_1.default.Router();
// eventually to this will help us ki koi bi typo hai to pehle hi compile time mei pta chl jaye rather than run time pe pta chale
//  but this wont solve all ur problems, user could get down ur backend by sending null or not even sending something
// soln for this is in the zod lecture
router.post('/todos', middleware_1.authenticateJwt, (req, res) => {
    const inputs = req.body;
    const done = false; // cuz when we create a todo its not initially done
    const userId = req.headers["userId"];
    const newTodo = new db_1.Todo({ title: inputs.title, description: inputs.description, done, userId });
    //ab is naye todo ko database mei save krdo
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create nw todo' });
    });
});
// The very reason we are storing the userid in newtodo is ki when we make a get request then just cuz its saved we can get all the todos specific to thatuser
// basically this is piece is imp for the platform
router.get('/todos', middleware_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    db_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to get todos' });
    });
});
// request to change some data
// VVVIMMPP
// is ki the user that is made the todo is the 1 thats gets to change it thats y we pass userid along with
router.put('/todos/:todoId/done', middleware_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    // Use `_id` instead of `id` in the query
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
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
exports.default = router;

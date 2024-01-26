import jwt from "jsonwebtoken";
import express, { Request, Response } from "express"; // Import Request and Response types
import { authenticateJwt, SECRET } from "../middleware";
import { User } from "../db";

const router = express.Router();
router.post('/signup', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log('Received signup request:', { username, password });

    const user = await User.findOne({ username });
    console.log('Existing user:', user);

    if (user) {
        console.log('User already exists. Sending 403.');
        res.status(403).json({ message: 'User already exists' });
    } else {
        console.log('Creating a new user.');
        const newUser = new User({ username, password });
        await newUser.save();
        console.log('User created:', newUser);

        const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '6h' });
        console.log('Token generated:', token);

        res.json({ message: 'User created successfully', token });
    }
});

router.post('/signin', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    
    if (user) {
        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.get('/list', authenticateJwt, async (req: Request, res: Response) => {
    const userId = req.headers["userId"] as string; // Assuming userId is a string
    const user = await User.findOne({ _id: userId });  // Use "_id" instead of "id"

    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(403).json({ message: 'User not logged in' });
    }
});


export default router;

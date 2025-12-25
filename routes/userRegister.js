import { Router } from 'express';
import { readJsonFile, writeJsonFile } from '../data/filesOperations.js';

const router = Router();

router.post('/', async (req, res) => {
    let newUser = req.body;
    if (!req.body.role)
        newUser = { ...newUser, role: 'user' };
    const users = await readJsonFile('./data/users.json');
    const user = users.find(u => u.username === newUser.username);
    if (user)
        return res.status(400).json({ message: 'User already exist' });
    users.push(newUser);
    await writeJsonFile('./data/users.json', users);
    res.status(200).json({ message: 'User registered successfully' });
})

export default router;
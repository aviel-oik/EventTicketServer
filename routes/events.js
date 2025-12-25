import { Router } from 'express';
import { readJsonFile, writeJsonFile } from '../data/filesOperations.js';
import { checkUserExist } from './tools.js';

const router = Router();

router.post('/', async (req, res) => {
    if (!checkUserExist(req.body.username, req.body.password))
        return res.status(400).json({ message: 'User not exist or incorrect password' });
    const events = await readJsonFile('./data/events.json');
    const newEvent = { eventName: req.body.eventName, ticketsAvailable: req.body.ticketsForSale, createdBy: req.body.username };
    const event = events.find(e => e.eventName.toLowerCase() === newEvent.eventName.toLowerCase());
    if (event)
        return res.status(400).json({ message: 'Event already exist' });
    events.push(newEvent);
    await writeJsonFile('./data/events.json', events);
    res.status(200).json({ message: 'Event created successfully' });
});

export default router;
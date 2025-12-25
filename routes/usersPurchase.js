import { Router } from 'express';
import { readJsonFile, writeJsonFile } from '../data/filesOperations.js';
import { checkUserExist } from './tools.js';

const router = Router();

router.post('/tickets/buy', async (req, res) => {
    if (!await checkUserExist(req.body.username, req.body.password))
        return res.status(400).json({ message: 'User not exist or incorrect password' });
    const ticket = { username: req.body.username, eventName: req.body.eventName, ticketsBought: req.body.quantity };
    const events = await readJsonFile('./data/events.json')
    const eventTicket = events.find(e => e.eventName.toLowerCase() === ticket.eventName.toLowerCase())
    if (!eventTicket)
        return res.status(400).json({ message: 'Event not exist' });
    if (eventTicket.ticketsAvailable < ticket.ticketsBought)
        return res.status(400).json({ message: 'No more tickts available for this event' });
    const receipts = await readJsonFile('./data/receipts.json');
    receipts.push(ticket);
    await writeJsonFile('./data/receipts.json', receipts);
    eventTicket.ticketsAvailable -= ticket.ticketsBought;
    const indexEvent = events.findIndex(e => e.eventName.toLowerCase() === ticket.eventName.toLowerCase());
    events[indexEvent] = eventTicket;
    await writeJsonFile('./data/events.json', events);
    res.status(200).json({ message: 'Tickets purchased successfully' });
});

router.get('/:username/summary', async (req, res) => {
    const username = req.params.username;
    const receipts = await readJsonFile('./data/receipts.json');
    const userReceipts = receipts.filter(r => r.username === username);
    let totalTickets = 0;
    const events = [];
    for (let receipt of userReceipts) {
        totalTickets += receipt.ticketsBought;
        if (!events.includes(receipt.eventName))
            events.push(receipt.eventName);
    };
    let avg = 0;
    if (events.length !== 0)
        avg = totalTickets / events.length;
    res.status(200).json({ totalTicketsBought: totalTickets, events: events, averageTicketsPerEvent: avg });
})



















export default router;
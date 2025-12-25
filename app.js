import express from 'express';
import userRegisterRouter from './routes/userRegister.js'
import eventsRouter from './routes/events.js'
import usersPurchaseRouter from './routes/usersPurchase.js'

const app = express();
const port = 3000

app.use(express.json());
app.use('/user/register', userRegisterRouter);
app.use('/creator/events', eventsRouter);
app.use('/users', usersPurchaseRouter);

app.listen(port, () => { console.log(`Run at http://localhost:${port}`) });



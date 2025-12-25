import { readJsonFile } from '../data/filesOperations.js';

export async function checkUserExist(username, password) {
    const users = await readJsonFile('./data/users.json');
    const user = users.find(u => u.username === username && u.password === password);
    if (user)
        return true;
    return false;
}
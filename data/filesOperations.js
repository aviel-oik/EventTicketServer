import fs from 'fs'

export async function readJsonFile(filePath) {
    const data = await fs.promises.readFile(filePath);
    if (!data) {
        await fs.promises.writeFile(filePath, '[]');
        return [];
    }
    return JSON.parse(data);
}

export async function writeJsonFile(filePath, jsonData) {
    const data = JSON.stringify(jsonData, null, 2);
    await fs.promises.writeFile(filePath, data);
}

import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        console.error(`FS operation failed, file ${filePath} does not exist`);
    }
};

await read();
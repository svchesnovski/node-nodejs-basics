import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const createStream = fs.createReadStream(filePath);
    createStream.pipe(process.stdout);
};

await read();
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const create = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    try {
        await fs.access(filePath, fs.constants.F_OK);
        throw new Error('Error: FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(filePath, 'I am fresh and young');
                console.log('File creation succeed!');
            } else {
                throw err;
            }
        }
};

await create();
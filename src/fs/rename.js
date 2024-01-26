import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const rename = async () => {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const wrongFile_path = path.join(__dirname, 'files', 'wrongFilename.txt');
    const properFile_path = path.join(__dirname, 'files', 'properFilename.md');

    try {
        await fs.access(wrongFile_path);
    } catch (err) {
        console.error('Error: FS operation failed, wrongFilename.txt does not exist');
        return;
    }

    try {
        await fs.access(properFile_path);
        console.error('Error: FS operation failed, properFilename.md already exists');
        return;
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.rename(wrongFile_path, properFile_path);
            console.log('File has been renamed!');
        } else {
            throw err;
        }
    }
};

await rename();
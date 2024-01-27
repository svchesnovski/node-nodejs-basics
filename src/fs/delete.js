import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const remove = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const currDir = path.resolve(__dirname, 'files');
    const fileName = 'fileToRemove.txt';
    const filePath = path.join(currDir, fileName);

    // Проверяем существует ли папка "files"
    try {
        await fs.access(currDir);
    } catch (err) {
        console.error(`Folder ${currDir} does not exist`);
        return;
    }
    // Проверяем существует ли файл "fileToRemove.txt"
    try {
        const filesInFolder = await fs.readdir(currDir);
        if (!filesInFolder.includes(fileName)) {
        throw new Error(`Error: FS operation failed, ${fileName} does not exist`);
        }
    } catch (err) {
        console.error(err);
        return;
    }
    // Удаляем файл "fileToRemove.txt"
    try {
        await fs.unlink(filePath);
        console.log(`${fileName} has been removed!`);
    } catch (err) {
        console.error('Something went wrong while deleting files', err);
    }    
};

await remove();
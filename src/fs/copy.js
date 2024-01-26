import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const copy = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const currDir = path.resolve(__dirname, 'files');
    const destDir = path.resolve(__dirname, 'files-copy');

    // Проверяем существует ли папка "files"
    try {
        await fs.access(currDir);
    } catch (err) {
        console.error(`Folder ${currDir} does not exist`);
        return;
    }

    // Проверяем существует ли папка "files-copy" и создаем ее, если необходимо
    try {
        await fs.access(destDir);
        throw new Error('Error: FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(destDir, { recursive: true });
        } else {
            throw err;
        }
    }

    // Копируем файлы из "files" в "files-copy"
    try {
        const files = await fs.readdir(currDir);
        for (const file of files) {
        const currPath = path.join(currDir, file);
        const destPath = path.join(destDir, file);
        await fs.copyFile(currPath, destPath);
        console.log(`Copied from ${currPath} to ${destPath}`);
        }
    } catch (err) {
        console.error('Something went wrong while copying files', err);
    }
};

await copy();
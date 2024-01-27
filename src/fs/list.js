import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const list = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const currDir = path.resolve(__dirname, 'files');

    // Проверяем существует ли папка "files"
    try {
        await fs.access(currDir);
    } catch (err) {
        console.error(`Folder ${currDir} does not exist`);
        return;
    }
    // Проверяем существуют ли файлы в папке "files" и выводим в консоль имена файлов с их расширениями
    try {
        const filesInFolder = await fs.readdir(currDir);
        if (filesInFolder.length !== 0) {
            await Promise.all(filesInFolder.map(async (item) => {
                const pathFile = path.join(currDir, item);
                const stats = await fs.stat(pathFile);
                if (stats.isFile()) {
                    console.log(
                        `${path.basename(pathFile, path.extname(item))}${path.extname(item)}`
                    );
                }
            }));
        } else {
            throw new Error(`FS operation failed, no files in this directory`);
        }
    } catch (err) {
        console.error(err);
        return;
    }
};

await list();

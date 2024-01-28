import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const decompress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const currDir = path.join(__dirname, 'files')
    const filePath = path.join(__dirname, 'files', 'archive.gz');
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(path.join(currDir, 'fileToCompress.txt'));
    const gunzip = zlib.createGunzip();
    readStream.pipe(gunzip).pipe(writeStream);
};

await decompress();
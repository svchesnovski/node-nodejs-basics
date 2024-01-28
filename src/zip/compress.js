import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const compress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const currDir = path.join(__dirname, 'files')
    const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(path.join(currDir, 'archive.gz'));
    const gzip = zlib.createGzip();
    readStream.pipe(gzip).pipe(writeStream);
};

await compress();
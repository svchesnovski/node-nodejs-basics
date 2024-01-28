import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { pipeline } from 'stream/promises';

const calculateHash = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const createHash = crypto.createHash('sha256');
    await pipeline(
        fs.createReadStream(filePath),
        createHash,
        async () => {
        console.log(createHash.digest('hex'));
        }
    );
};

await calculateHash();
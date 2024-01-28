import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import fs from 'fs';

import './files/c.js';

const random = Math.random();

let unknownObject;

const loadJson = async (filePath) => {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (err) {
        console.error(`Error reading or parsing JSON file: ${err}`);
        return null;
    }
};

const getJson = () => {
    const currFileURL = import.meta.url;
    const currDir = path.dirname(new URL(currFileURL).pathname);
    const fileName = random > 0.5 ? 'a.json' : 'b.json';
    const filePath = path.join(currDir, 'files', fileName);
    return loadJson(filePath);
};

try {
    unknownObject = await getJson();
    console.log(unknownObject);
} catch (err) {
    console.error(err);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(new URL(import.meta.url).pathname)}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
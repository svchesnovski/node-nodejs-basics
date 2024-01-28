import { Transform } from 'stream';

const transform = async () => {
    const toReverse = new Transform({
        async transform(chunk, encoding, callback) {
            try {
                const revDone = chunk.toString().split('').reverse().join('');
                callback(null, revDone);
            } catch (error) {
                callback(error);
            }
        }
    });
    process.stdin.pipe(toReverse).pipe(process.stdout);
};

await transform();
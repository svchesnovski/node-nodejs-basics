const parseArgs = () => {
    const args = process.argv.slice(2);
    args.forEach((arrayElement, index) => {
        if (index % 2 === 0) {
            const propName = arrayElement.substring(2);
            const value = args[index + 1];
            console.log(`${propName} is ${value}`);
        }
    });
};

parseArgs();
const parseEnv = () => {
    Object.keys(process.env)
        .filter(envKey => envKey.startsWith('RSS_'))
        .forEach(envKey => console.log(`${envKey}=${process.env[envKey]}`));
};

parseEnv();
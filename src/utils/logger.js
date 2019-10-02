import appRoot from 'app-root-path';
import winston from 'winston';
import path from 'path';
import fs from 'fs';

/**
 * Creates different types of logging (info, error and console in case of developement environment)
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: path.join('log', 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join('log', 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const logDirectory = path.join(appRoot.path, 'log');

const mkdir = (path) => {
    return fs.existsSync(path) || fs.mkdirSync(path);
};

mkdir(logDirectory);

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

export { accessLogStream };
export default logger;
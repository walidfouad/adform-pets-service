import logger from './utils/logger';
global.logger = logger;

import app, { server } from './server/server';
import { serverSettings } from './config/config';

process.on('uncaughtException', (err) => {
    logger.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
    logger.error('uncaughtRejection', err);
});

const startServer = (port) => {

    app.listen({ port }, () => {
        logger.info(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
};

if (!serverSettings.port) {
    logger.error("The server must be started with an available port");
    process.exit(9);
}

startServer(serverSettings.port);
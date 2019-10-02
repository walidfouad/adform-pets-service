import app, { server } from './server/server';
import { serverSettings } from './config/config';
import logger from './utils/logger';
global.logger = logger;

// *** Unhandled Exceptions ***
process.on('uncaughtException', (err) => {
    logger.error('There was an uncaught error', err);
    process.exit(1);
});

/**
 * Runing server and listening on specified port
 * @param {number} port
 */
const startServer = (port) => {

    app.listen({ port }, () => {
        logger.info(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
};

if (!serverSettings.port) {
    logger.error("The server must be started with an available port");
    process.exit(9);
}

// *** START SERVER (LISTENING) ***
startServer(serverSettings.port);
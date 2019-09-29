import app, { server } from './server/server';
import { serverSettings } from './config/config';

console.log('****** Welcome to Pets Microservice *******');

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err);
});

const startServer = (port) => {

    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
};

//console.log(app);

if (!serverSettings.port) {
    console.log('The server must be started with an available port');
    process.exit(1);
}

startServer(serverSettings.port);
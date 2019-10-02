import logger, { accessLogStream } from '../utils/logger';
import { ApolloServer } from 'apollo-server-express';
import schema from '../schema/schema';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// log all requests to access.log
app.use(morgan('common', {
    stream: accessLogStream
}));

// enable all CORS Requests
app.use(cors());

// help in secuirty
app.use(helmet());

// handle error requests
app.use((err, req, res, next) => {
    logger.error("REQUEST ERROR", err);
    res.status(500).send("REQUEST ERROR");
});

// initiate a new Apollo server with schema definitions and resolvers
const server = new ApolloServer({ schema });
// it defaults to path '/graphql'
server.applyMiddleware({ app });

export { server };
export default app;
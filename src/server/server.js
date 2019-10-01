import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import logger, { accessLogStream } from '../utils/logger';

import schema from '../schema/schema';

const app = express();

app.use(morgan('common', {
    stream: accessLogStream
}));

app.use(cors());
app.use(helmet());

app.use((err, req, res, next) => {
    logger.error("REQUEST ERROR", err);
    res.status(500).send("REQUEST ERROR");
});

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });


export { server };
export default app;
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import schema from '../schema/schema';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use((err, req, res, next) => {
    console.log("REQUEST ERROR");
    res.status(500).send('Something went wrong!');
});

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });


export { server };
export default app;
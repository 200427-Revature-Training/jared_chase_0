import express from 'express';
import { db } from './daos/db';
import { clientRouter } from './routers/client.router';
import { exterminatorRouter } from './routers/exterminator.router';
import { pestRouter } from './routers/pest.router';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());

app.use((request, response, next) => {
    next();
});

app.use('/client', clientRouter);
app.use('/exterminator', exterminatorRouter);
app.use('/pest', pestRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});
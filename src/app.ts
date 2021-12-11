import Koa from 'koa';
import body from 'koa-bodyparser';

import errorHandling from './middleware/errorHandling';
import routes from './routes';
import { initDb } from './lib/db';
import * as mongoose from 'mongoose';

initDb();

const app: Koa = new Koa();
app.use(body());

app.use(errorHandling);
routes(app);

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received: closing HTTP server');
    mongoose.connection.close();
});

process.on('beforeExit', () => {
    console.info('beforeExit');
    mongoose.connection.close();
});

export default app;

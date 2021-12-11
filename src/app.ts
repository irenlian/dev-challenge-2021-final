import Koa from 'koa';
import body from 'koa-bodyparser';

import errorHandling from './middleware/errorHandling';
import withCache from './middleware/withCache';
import routes from './routes';
import { initDb } from './lib/db';

initDb();

const app: Koa = new Koa();
app.use(body());

app.use(errorHandling);
// app.use(withCache);
routes(app);

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received: closing HTTP server');
});

export default app;

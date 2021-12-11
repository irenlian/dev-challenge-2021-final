import Koa from 'koa';
import body from 'koa-bodyparser';

import errorHandling from './middleware/errorHandling';
import routes from './routes';

const app: Koa = new Koa();
app.use(body());

app.use(errorHandling);
routes(app);

export default app;

import Koa from 'koa';
import status from './status';
import resources from './resources';

export default (app: Koa) => {
    app.use(status.routes());
    app.use(resources.routes());
};

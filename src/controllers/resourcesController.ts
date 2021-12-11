import Koa from 'koa';
import dbClient from '../lib/db';

export const status = async (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = await dbClient.query('SELECT NOW()');
};

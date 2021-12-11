import Koa from 'koa';
import dbClient from '../lib/db';
import { Models } from '../schemas';

export const status = async (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = await Models.resources.count({});
};

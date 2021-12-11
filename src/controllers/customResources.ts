import Koa from 'koa';
import { Schema } from 'mongoose';
import db from '../lib/db';
import { Models } from '../schemas';
import { converter } from '../utils';

export const findCustom = async (ctx: Koa.Context) => {
    const resource = await Models.schemas.findOne({ name: ctx.params?.schema });
    if (!resource) {
        ctx.status = 404;
        return;
    }
    const schema = new Schema(converter(resource));
    const newModel = db.model(resource.name, schema);
    const data = await newModel.find({});

    ctx.status = 200;
    ctx.body = data;
};

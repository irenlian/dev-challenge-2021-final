import Koa from 'koa';
import { Schema } from 'mongoose';
import db from '../lib/db';
import { Models } from '../schemas';
import { converter } from '../utils';

const getModel = async (ctx: Koa.Context) => {
    const name = ctx.params?.schema as string;
    const saved = name && Models[name];
    if (saved) return saved;
    const resource = await Models.schemas.findOne({ name: ctx.params?.schema });
    if (!resource) {
        return null;
    }
    const schema = new Schema(converter(resource));
    const newModel = db.model(resource.name, schema);
    Models[name] = newModel;
    return newModel;
}

export const findCustom = async (ctx: Koa.Context) => {
    const model = await getModel(ctx);
    if (!model) {
        ctx.status = 404;
        return;
    }
    const data = await model.find({});

    ctx.status = 200;
    ctx.body = data.map((el: any) => {
        const { _id, __v, ...copy } = el._doc;
        copy.id = _id;
        return copy;
    });
};

export const findOneCustom = async (ctx: Koa.Context) => {
    const id = ctx.params?.id as string;
    console.log(id);
    const model = await getModel(ctx);
    if (!model || !id) {
        console.log(model);
        ctx.status = 404;
        return;
    }
    const data = await model.findById(id);
    const { _id, __v, ...copy } = data._doc;
    copy.id = _id;

    ctx.status = 200;
    ctx.body = copy;
};

export const createCustom = async (ctx: Koa.Context) => {
    const model = await getModel(ctx);
    if (!model) {
        ctx.status = 404;
        return;
    }
    const instance = new model(ctx.request.body);
    const res = await instance.save();

    ctx.status = 200;
    ctx.body = res;
};

import Koa from 'koa';
import { getModel } from '../utils';

export const findCustom = async (ctx: Koa.Context) => {
    const { model, resource } = await getModel(ctx);
    if (!model) {
        ctx.status = 404;
        return;
    }
    const queryable = resource.fields.filter((f: any) => f.queryable).map((f: any) => f.name);
    const { limit, offset, ...filter } = ctx.query;
    const wrongQuery = Object.keys(filter).filter((f: any) => !queryable.includes(f));
    if (wrongQuery.length) {
        ctx.status = 422;
        ctx.body = `Next query variables are unavailable: ${wrongQuery}`;
        return;
    }
    const options = {
        ...(limit ? { limit: parseInt(limit as string, 10) } : {}),
        ...(offset ? { skip: parseInt(offset as string, 10) } : {}),
    };
    const data = await model.find(filter || {}, null, options);

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
    const { model } = await getModel(ctx);
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
    const { model } = await getModel(ctx);
    if (!model) {
        ctx.status = 404;
        return;
    }
    const instance = new model(ctx.request.body);
    const res = await instance.save();

    ctx.status = 200;
    ctx.body = res;
};

export const updateCustom = async (ctx: Koa.Context) => {
    const id = ctx.params?.id as string;
    const { model, resource } = await getModel(ctx);
    if (!model || !id) {
        ctx.status = 404;
        return;
    }
    const readOnly = resource.fields.filter((f: any) => f.readonly).map((f: any) => f.name);
    const wrongFields = Object.keys(ctx.request.body as any).filter((f: any) => readOnly.includes(f));
    if (wrongFields.length) {
        ctx.status = 422;
        ctx.body = `These fields are readonly: ${wrongFields}`;
        return;
    }
    const data = await model.updateOne({ _id: id }, ctx.request.body);
    if (data.matchedCount) {
        ctx.status = 200;
    } else {
        ctx.status = 422;
        ctx.body = 'Did not found';
    }
};

export const deleteCustom = async (ctx: Koa.Context) => {
    const id = ctx.params?.id as string;
    const { model } = await getModel(ctx);
    if (!model || !id) {
        ctx.status = 404;
        return;
    }
    const res = await model.deleteOne({ _id: id });
    if (res.deletedCount) {
        ctx.status = 204;
    } else {
        ctx.status = 422;
        ctx.body = 'Did not found';
    }
};

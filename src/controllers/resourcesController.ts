import Koa from 'koa';
import db from '../lib/db';
import { Models } from '../schemas';
import { SchemaModel } from '../schemas/schema';
import { FieldModel } from '../schemas/field';
import { getModel } from '../utils';

export const status = async (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = await Models.resources.count({});
};

export const create = async (ctx: Koa.Context) => {
    const body = ctx.request.body;
    console.log(body.schema);
    const schemaInput = {
        name: body.schema || '',
        fields: body.fields.map((f: any) => new Models.fields(f) as FieldModel),
    } as SchemaModel;
    const schema: SchemaModel = new Models.schemas(schemaInput);
    await schema.save();
    ctx.status = 201;
};

export const find = async (ctx: Koa.Context) => {
    const resource = await Models.schemas.find({});
    ctx.status = 200;
    ctx.body = {
        resources: resource.map((r: any) => ({
            schema: r.name,
            endpoint: `/api/v1/${r.name}`,
        })),
    };
};

export const deleteResource = async (ctx: Koa.Context) => {
    const { model } = await getModel(ctx);
    if (!model) {
        ctx.status = 404;
        return;
    }
    await model.deleteMany({});
    await Models.schemas.deleteMany({ name: ctx.params?.schema });
    db.deleteModel(ctx.params?.schema);

    ctx.status = 204;
};

export const updateResource = async (ctx: Koa.Context) => {
    const { model } = await getModel(ctx);
    if (!model) {
        ctx.status = 404;
        return;
    }
    const name = ctx.params?.schema;
    db.deleteModel(name);
    delete Models[name];
    const body = ctx.request.body;
    console.log(body.schema);
    const schemaInput = {
        name: ctx.params?.schema,
        fields: body.fields.map((f: any) => new Models.fields(f) as FieldModel),
    } as SchemaModel;
    const res = await Models.schemas.update({ name }, schemaInput);
    console.log(res);
    ctx.status = 200;
};

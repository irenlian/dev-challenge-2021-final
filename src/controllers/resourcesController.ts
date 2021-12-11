import Koa from 'koa';
import { Models } from '../schemas';
import { _FilterQuery, SchemaDefinition } from 'mongoose';
import { SchemaModel } from '../schemas/schema';
import { FieldModel } from '../schemas/field';

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
    const res = await schema.save();
    ctx.status = 200;
};

export const find = async (ctx: Koa.Context) => {
    const input = ctx.request.body as _FilterQuery<SchemaModel>;
    const resource = await Models.schemas.find({});
    ctx.status = 200;
    ctx.body = resource;
};

import Koa from 'koa';
import { Models } from '../schemas';
import { ResourceModel } from '../schemas/resource';
import { _FilterQuery } from 'mongoose';
import { SchemaModel } from '../schemas/schema';
import { FieldModel } from '../schemas/field';

export const status = async (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = await Models.resources.count({});
};

export const create = async (ctx: Koa.Context) => {
    const body = ctx.request.body;
    const schemaInput = {
        name: body.name || '',
        fields: body.fields.map((f: any) => new Models.fields(f) as FieldModel),
    } as SchemaModel;
    const schema: SchemaModel = new Models.schemas(schemaInput);
    const resourceInput: ResourceModel = {
        endpoint: body.endpoint,
        schema,
    } as ResourceModel;
    console.log(resourceInput);
    const resource = new Models.resources(resourceInput);
    const res = await resource.save();
    console.log(res);
    ctx.status = 200;
};

export const find = async (ctx: Koa.Context) => {
    const input = ctx.request.body as _FilterQuery<ResourceModel>;
    console.log(input);
    const resource = await Models.resources.findOne(input);
    console.log(resource);
    ctx.status = 200;
    ctx.body = resource;
};

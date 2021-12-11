import mongoose, { Schema } from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;
import { SchemaDefinition } from 'mongoose';
import Koa from 'koa';
import { Models } from './models';
import db from './lib/db';

const getType = (type: string) => {
    if (type === 'string') {
        return String;
    }
    if (type === 'boolean') {
        return Boolean;
    }
    if (type === 'integer') {
        return Number;
    }
    return Mixed;
};

export const converter = (data: any): SchemaDefinition<any> => {
    return data?.fields?.reduce((acc: any, field: any) => {
        acc[field?.name] = {
            type: getType(field?.type),
            required: !!field?.required,
            unique: !!field?.unique,
            default: field?.default,
        };
        return acc;
    }, {});
};

export const getModel = async (ctx: Koa.Context) => {
    const name = ctx.params?.schema as string;
    const saved = name && Models[name];

    const resource = await Models.schemas.findOne({ name: ctx.params?.schema });
    if (!resource) {
        return {};
    }
    if (saved) {
        return { model: saved, resource };
    }
    const schema = new Schema(converter(resource));
    const newModel = db.model(resource.name, schema);
    Models[name] = newModel;
    return { model: newModel, resource };
};

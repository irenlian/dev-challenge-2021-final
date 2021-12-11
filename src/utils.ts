import mongoose from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;
import { SchemaDefinition } from 'mongoose';

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

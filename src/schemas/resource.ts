import { Document, Schema } from 'mongoose';
import { SchemaModel, SchemaSchema } from './schema';

export type ResourceModel = Document & {
    schema: SchemaModel,
    endpoint: string;
};
export const ResourceSchema = new Schema({
    schema: SchemaSchema,
    endpoint: {
        type: String,
        required: true
    },
});

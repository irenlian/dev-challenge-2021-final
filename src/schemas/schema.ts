import { Document, Schema } from 'mongoose';
import { FieldModel, FieldSchema } from './field';

export type SchemaModel = Document & {
    name: string;
    fields: FieldModel[],
};
export const SchemaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fields: [FieldSchema],
});

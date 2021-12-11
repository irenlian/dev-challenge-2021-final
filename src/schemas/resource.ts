import { Document, Schema } from 'mongoose';

export type ResourceModel = Document & {
    id: string;
    name: string;
    schema_id: string;
    endpoint: string;
};
export const ResourceSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    schema_id: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    },
});

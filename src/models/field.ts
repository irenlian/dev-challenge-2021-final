import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;

export type FieldModel = Document & {
    name: string;
    type: string;
    required?: boolean;
    default?: any;
    queryable?: boolean,
    readonly?: boolean,
    unique?: boolean,
};
export const FieldSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    default: {
        type: Mixed,
        required: false
    },
    queryable: {
        type: Boolean,
    },
    readonly: {
        type: Boolean,
    },
    unique: {
        type: Boolean,
    },
});

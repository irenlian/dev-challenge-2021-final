import db from '../lib/db';
import { ResourceModel, ResourceSchema } from './resource';
import { SchemaModel, SchemaSchema } from './schema';
import { FieldModel, FieldSchema } from './field';

export const Models = {
    resources: db.model<ResourceModel>('Resource', ResourceSchema),
    schemas: db.model<SchemaModel>('Schema', SchemaSchema),
    fields: db.model<FieldModel>('Field', FieldSchema),
};

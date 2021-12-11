import db from '../lib/db';
import { ResourceModel, ResourceSchema } from './resource';

export const Models = {
    resources: db.model<ResourceModel>('Resource', ResourceSchema),
};

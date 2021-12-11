import Joi from 'joi';

export const createResourceSchema = {
    body: {
        schema: Joi.string().min(1).max(100).alphanum().required(),
        fields: Joi.array().items(Joi.object({
            name: Joi.string().min(1).max(100).alphanum().required(),
            type: Joi.string().valid('string','boolean', 'integer').required(),
            default: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.bool()).optional(),
            readonly: Joi.bool().optional(),
            queryable: Joi.bool().optional(),
            unique: Joi.bool().optional(),
            required: Joi.bool().optional(),
        })).required(),
    }
}

export const updateResourceSchema = {
    body: {
        schema: Joi.string().min(1).max(100).alphanum().optional(),
        fields: Joi.array().items(Joi.object({
            name: Joi.string().min(1).max(100).alphanum().required(),
            type: Joi.string().valid('string','boolean', 'integer').required(),
            default: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.bool()).optional(),
            readonly: Joi.bool().optional(),
            queryable: Joi.bool().optional(),
            unique: Joi.bool().optional(),
            required: Joi.bool().optional(),
        })).required(),
    }
}

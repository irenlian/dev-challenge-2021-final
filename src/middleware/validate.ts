import Koa from 'koa';
import Joi from 'joi';
import { Models } from '../models/validate';

/**
 * Helper function to validate an object against the provided schema,
 * and to throw a custom error if object is not valid.
 *
 * @param {Object} object The object to be validated.
 * @param {String} label The label to use in the error message.
 * @param {Object} schema An object containing the Joi schema for each key found in "object".
 */
const validateObject = (
    object: object = {},
    label: string,
    schema?: Joi.SchemaMap,
    options?: Joi.ValidationOptions,
) => {
    if (schema) {
        const { error } = Joi.object(schema).validate(object, options);
        if (error) {
            throw new Error(`Invalid ${label} - ${error.message}`);
        }
    }
};

/**
 * Generate a Koa middleware function to validate a request using
 * the provided validation objects.
 *
 * @returns A validation middleware function.
 */
const validate = (schema: Models.Validate.ValidateSchema = {}): Koa.Middleware => async (
    ctx: Koa.Context,
    next: Function,
) => {
    try {
        validateObject(ctx.headers, 'Headers', schema.headers, { allowUnknown: true });
        validateObject(ctx.params, 'URL Parameters', schema.params);
        validateObject(ctx.query, 'URL Query', schema.query);

        if (ctx.request.body) {
            validateObject(ctx.request.body, 'Request Body', schema.body);
        }
    } catch (err) {
        ctx.throw(422, JSON.stringify({
            success: false,
            error: 'Invalid input format. Please use only positive integers'
        }));
    }

    await next();
};

export default validate;

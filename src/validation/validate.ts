import Koa from 'koa';
import Joi from 'joi';
import { Models } from '.';

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
        ctx.throw(
            422,
            JSON.stringify({
                success: false,
                error: err.message,
            }),
        );
    }

    await next();
};

export default validate;

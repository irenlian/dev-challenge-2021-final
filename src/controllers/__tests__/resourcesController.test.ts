import { create } from '../resourcesController';
jest.mock('../../models', () => {
    return {
        Models: {
            schemas: () => ({
                // constructor: jest.fn().mockResolvedValue({
                save: jest.fn().mockRejectedValue('Error!'),
                // }),
                findOne: jest.fn().mockResolvedValue(null),
            }),
            fields: jest.fn(),
        },
    };
});
// import { Models } from '../../models';

describe('managing all resources', () => {
    describe('create', () => {
        it('returns 422 for empty', () => {
            // jest.spyOn(Models.schemas.prototype, 'findOne').mockResolvedValue(null);
            const ctx = {
                request: {
                    body: {},
                },
            } as any;
            const res = create(ctx);
            expect(ctx.status).toEqual(422);
        });

        it.skip('returns 201', () => {
            const ctx = {
                request: {
                    body: {
                        schema: 'users',
                        fields: [
                            {
                                name: 'email',
                                type: 'string',
                                required: true,
                                unique: true,
                                queryable: true,
                                readonly: true,
                            },
                            {
                                name: 'fullName',
                                type: 'string',
                                required: true,
                                queryable: true,
                            },
                            {
                                name: 'yearsOfExperience',
                                type: 'integer',
                                default: 0,
                            },
                            {
                                name: 'availabeForHiring',
                                type: 'boolean',
                                default: false,
                            },
                        ],
                    },
                },
            } as any;
            const res = create(ctx);
            expect(ctx.status).toEqual(201);
        });
    });
});

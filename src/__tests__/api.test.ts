import app from '../app';
import * as http from 'http';
import supertest from 'supertest';
import * as mongoose from 'mongoose';

describe('Resources Endpoints', () => {
    const server = http.createServer(app.callback());
    const apptest = supertest(server);

    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });

    test('should not pass validation', async () => {
        const res = await apptest.post('/api/resources').send();
        expect(res.statusCode).toEqual(422);
    });

    test('should create a new resource', async () => {
        const res = await apptest.post('/api/resources').send({
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
        });

        expect(res.statusCode).toEqual(201);
    });

    test('should not create a duplicate', async () => {
        try {
            const res = await apptest.post('/api/resources').send({
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
            });

            throw new Error();
        } catch {
            // Should throw
        }
    });

    test('should delete created resource', async () => {
        const res = await apptest.delete('/api/resources/users').send();

        expect(res.statusCode).toEqual(204);
    });
});

import * as http from 'http';
import supertest from 'supertest';
import app from '../app';

describe('Test', () => {
    const apptest = supertest(http.createServer(app.callback()));

    it('should create a new resource', async () => {
        const res = await apptest.post('/api/resources').send({
                schema: 'users',
                fields: [
                    {
                        name: 'email',
                        type: 'string',
                        required: true,
                        unique: true,
                        queryable: true,
                        readonly: true
                    },
                    {
                        name: 'fullName',
                        type: 'string',
                        required: true,
                        queryable: true
                    },
                    {
                        name: 'yearsOfExperience',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'availabeForHiring',
                        type: 'boolean',
                        default: false
                    }
                ]
            }
        );
        expect(res.statusCode).toEqual(201);
    });

    it('should not create a new resource if already exists', async () => {
        const res = await apptest.post('/api/resources').send({
                schema: 'users',
                fields: [
                    {
                        name: 'email',
                        type: 'string',
                        required: true,
                        unique: true,
                        queryable: true,
                        readonly: true
                    },
                ]
            }
        );
        expect(res.statusCode).toEqual(422);
    });
});

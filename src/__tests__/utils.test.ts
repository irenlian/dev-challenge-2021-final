import { converter } from '../utils';

describe('Utils', () => {
    describe('converter', () => {
        it('returns proper value', () => {
            const res = converter({
                schema: 'users',
                fields: [
                    {
                        name: 'yearsOfExperience',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'fullName',
                        type: 'string',
                        required: true,
                        queryable: true,
                    },
                ],
            });
            expect(res).toEqual({
                yearsOfExperience: {
                    type: Number,
                    default: 0,
                    required: false,
                    unique: false,
                },
                fullName: {
                    type: String,
                    required: true,
                    unique: false,
                },
            });
        });
    });
});

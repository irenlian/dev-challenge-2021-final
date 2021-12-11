import mongoose from 'mongoose';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config';

const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
};

export const initDb = async () => {
    try {
        await mongoose.connect(url, options);
        console.log('MongoDB is connected');
    } catch (err) {
        console.log(err);
    }
};

export default mongoose;

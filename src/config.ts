require('dotenv').config();

export const PORT = process.env.PORT || 8080;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 27017;
export const DB_USER = process.env.DB_USER || 'admin';
export const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
export const DB_NAME = process.env.DB_NAME || 'root';

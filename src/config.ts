require('dotenv').config();

export const PORT = process.env.PORT || 8080;
export const PGHOST = process.env.PGHOST || 'localhost';
export const PGPORT = process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432;
export const PGUSER = process.env.PGUSER || 'postgres';
export const PGPASSWORD = process.env.PGPASSWORD || 'postgres';
export const PGDATABASE = process.env.PGDATABASE || 'postgres';

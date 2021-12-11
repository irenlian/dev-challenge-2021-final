import { Client } from 'pg';
import { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } from '../config';
// pools will use environment variables
// for connection information

const dbClient = new Client({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
});
export const initDb = () => {
    dbClient.connect();
}


// export const query = async (query: string) => {
//     try {
//         return await client.query(query);
//     } catch (e) {
//         console.log(e);
//     }
// }

export default dbClient;

import { Client } from 'pg';
import usersData from './userData.seed';
import * as dotenv from 'dotenv';
dotenv.config();

(async function seed() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    });

    await client.connect();

    for (let i = 0, len = usersData.length; i < len; i++) {
        const userData = usersData[i];
        await client.query(
            `INSERT INTO users (username, password, role) VALUES ('${userData.username}', '${userData.password}', '${userData.role}')`
        );
    }

    await client.end();
    console.log('seed complete!');
})();

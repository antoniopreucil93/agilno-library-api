import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { migrations1665757698335 } from './migrations/1665757698335-migrations';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    migrations: [migrations1665757698335],
    synchronize: false,
    logging: false,
});

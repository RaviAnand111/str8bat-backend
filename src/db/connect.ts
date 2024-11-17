import { configDotenv } from "dotenv";
configDotenv();

export const pool = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },
    debug: true,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
});

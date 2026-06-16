import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: isProduction ? './dist/db/migrations' : './src/db/migrations',
      extension: 'js',
    },
    seeds: {
      directory: isProduction ? './dist/db/seeds' : './src/db/seeds',
      extension: 'js',
    },
  },
};

export default config;
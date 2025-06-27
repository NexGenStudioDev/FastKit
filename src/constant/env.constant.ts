import { config } from 'dotenv';
import { EnvType } from '../type/env.types';
import path from 'path';

config({
    path: path.join(process.cwd(), '.env'),
});

const rawEnv: Partial<Record<keyof EnvType, string>> = process.env as Partial<EnvType>;

const envConstants: EnvType = {
  // ----------------------------
  // Server
  // ----------------------------
  PORT: parseInt(rawEnv.PORT || '3000', 10),
  HOST: rawEnv.HOST || 'localhost',
  NODE_ENV: rawEnv.NODE_ENV || 'development',
  ENVIRONMENT: rawEnv.ENVIRONMENT || 'development',
  SERVER_TIMEOUT: parseInt(rawEnv.SERVER_TIMEOUT || '30000', 10),
  SERVER_KEEP_ALIVE: rawEnv.SERVER_KEEP_ALIVE === 'true',
  SERVER_BODY_LIMIT: rawEnv.SERVER_BODY_LIMIT || '100mb',
  SERVER_TRUST_PROXY: rawEnv.SERVER_TRUST_PROXY === 'true',

  // ----------------------------
  // Database
  // ----------------------------
  DATABASE_TYPE: rawEnv.DATABASE_TYPE || 'mongodb',
  DATABASE_URL: rawEnv.DATABASE_URL || 'mongodb://localhost:27017/fastkit',
  DATABASE_HOST: rawEnv.DATABASE_HOST,
  DATABASE_PORT: rawEnv.DATABASE_PORT ? parseInt(rawEnv.DATABASE_PORT, 10) : undefined,
  DATABASE_USERNAME: rawEnv.DATABASE_USERNAME,
  DATABASE_PASSWORD: rawEnv.DATABASE_PASSWORD,
  DATABASE_NAME: rawEnv.DATABASE_NAME,
  DATABASE_SSL: rawEnv.DATABASE_SSL === 'true',
  DATABASE_POOL_SIZE: rawEnv.DATABASE_POOL_SIZE ? parseInt(rawEnv.DATABASE_POOL_SIZE, 10) : 10,
};

console.log('ee' , envConstants)

export const EnvConstants = Object.freeze(envConstants);

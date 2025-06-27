import { config } from 'dotenv';
import { EnvType } from '../type/env.types';
import path from 'path';

config({
  path: path.join(process.cwd(), '.env'),
});

const getEnvironmentType = (env?: string): 'development' | 'production' | 'test' | 'staging' => {
  if (env === 'development' || env === 'production' || env === 'test' || env === 'staging') {
    return env;
  }
  return 'development';
};

const getDatabaseType = (
  type?: string,
): 'mongodb' | 'mysql' | 'postgresql' | 'sqlite' | 'redis' => {
  if (
    type === 'mongodb' ||
    type === 'mysql' ||
    type === 'postgresql' ||
    type === 'sqlite' ||
    type === 'redis'
  ) {
    return type;
  }
  return 'mongodb';
};

const envConstants: EnvType = {
  PORT: parseInt(process.env.PORT || '3000'),
  HOST: process.env.HOST || 'localhost',
  NODE_ENV: getEnvironmentType(process.env.NODE_ENV),
  ENVIRONMENT: getEnvironmentType(process.env.ENVIRONMENT || 'development'),
  SERVER_TIMEOUT: parseInt(process.env.SERVER_TIMEOUT || '30000', 10),
  SERVER_KEEP_ALIVE: process.env.SERVER_KEEP_ALIVE === 'true',
  SERVER_BODY_LIMIT: process.env.SERVER_BODY_LIMIT || '100mb',
  SERVER_TRUST_PROXY: process.env.SERVER_TRUST_PROXY === 'true',

  // ----------------------------
  // Database
  // ----------------------------
  DATABASE_TYPE: getDatabaseType(process.env.DATABASE_TYPE),
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/fastkit',
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_SSL: process.env.DATABASE_SSL === 'true',
  DATABASE_POOL_SIZE: process.env.DATABASE_POOL_SIZE
    ? parseInt(process.env.DATABASE_POOL_SIZE, 10)
    : 10,

  // ----------------------------
  // JWT
  // ----------------------------
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  JWT_ALGORITHM: (process.env.JWT_ALGORITHM as EnvType['JWT_ALGORITHM']) || 'HS256',

  // ----------------------------
  // CORS
  // ----------------------------
  CORS_ORIGIN:
    process.env.CORS_ORIGIN === 'true'
      ? true
      : process.env.CORS_ORIGIN === 'false'
        ? false
        : process.env.CORS_ORIGIN,
  CORS_METHODS: process.env.CORS_METHODS,
  CORS_ALLOWED_HEADERS: process.env.CORS_ALLOWED_HEADERS,
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',

  // ----------------------------
  // Security
  // ----------------------------
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS
    ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)
    : undefined,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : undefined,
  SECURITY_HELMET: process.env.SECURITY_HELMET === 'true',
  SECURITY_COMPRESSION: process.env.SECURITY_COMPRESSION === 'true',
  SECURITY_MORGAN: process.env.SECURITY_MORGAN === 'true',

  // ----------------------------
  // Email
  // ----------------------------
  EMAIL_SERVICE: process.env.EMAIL_SERVICE as EnvType['EMAIL_SERVICE'],
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined,
  EMAIL_SECURE: process.env.EMAIL_SECURE === 'true',
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,

  // ----------------------------
  // Custom
  // ----------------------------
  APP_NAME: process.env.APP_NAME,
  API_VERSION: process.env.API_VERSION,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
};

console.log('Environment Constants Loaded:', envConstants);

export const EnvConstants = Object.freeze(envConstants);

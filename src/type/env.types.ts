export interface EnvType {
  // Server
  PORT: number;
  HOST: string;
  NODE_ENV: 'development' | 'production' | 'test' | 'staging';
  ENVIRONMENT: 'development' | 'production' | 'test' | 'staging';

  // Database
  DATABASE_TYPE: 'mongodb' | 'mysql' | 'postgresql' | 'sqlite' | 'redis';
  DATABASE_URL: string;

  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN?: string;
  JWT_ALGORITHM?: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';

  // CORS
  CORS_ORIGIN: string | boolean;
  CORS_METHODS?: string;
  CORS_ALLOWED_HEADERS?: string;
  CORS_CREDENTIALS?: boolean;

  // Security
  RATE_LIMIT_WINDOW_MS?: number;
  RATE_LIMIT_MAX?: number;
  SECURITY_HELMET?: boolean;
  SECURITY_COMPRESSION?: boolean;
  SECURITY_MORGAN?: boolean;

  // Email
  EMAIL_SERVICE?: 'gmail' | 'yahoo' | 'outlook' | 'sendgrid' | 'mailgun' | 'ses' | 'custom';
  EMAIL_HOST?: string;
  EMAIL_PORT?: number;
  EMAIL_SECURE?: boolean;
  EMAIL_USERNAME?: string;
  EMAIL_PASSWORD?: string;
  EMAIL_FROM?: string;

  // Custom
  APP_NAME?: string;
  API_VERSION?: string;
  MAX_FILE_SIZE?: string;
}

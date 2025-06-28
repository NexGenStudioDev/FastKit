import { DatabaseConfig } from '../db/Db.type'; // Ensure this path is correct

// =================== TYPES & INTERFACES ===================

export type JWTAlgorithmType =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512';

export interface JWTConfig {
  secret: string;
  expiresIn?: string;
  refreshSecret?: string;
  refreshExpiresIn?: string;
  algorithm?: JWTAlgorithmType;
  issuer?: string;
  audience?: string;
  subject?: string;
  notBefore?: string;
  jwtid?: string;
}

export type HTTPMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export type CORSOriginType =
  | string
  | string[]
  | boolean
  | RegExp
  | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void);

export interface CORSConfig {
  origin?: CORSOriginType;
  methods?: HTTPMethodType[];
  allowedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
  exposedHeaders?: string[];
}

export type EnvironmentType = 'development' | 'production' | 'test' | 'staging';

export interface ServerConfig {
  port: number;
  host?: string;
  environment: EnvironmentType;
  nodeEnv?: string;
  timeout?: number;
  keepAlive?: boolean;
  bodyLimit?: string;
  trustProxy?: boolean;
}

export interface SecurityConfig {
  rateLimitWindowMs?: number;
  rateLimitMax?: number;
  helmet?: boolean;
  compression?: boolean;
  morgan?: boolean;
  csrf?: boolean;
  session?: {
    secret: string;
    name?: string;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  };
  csp?: Record<string, string[]>;
}

export type EmailServiceType =
  | 'gmail'
  | 'yahoo'
  | 'outlook'
  | 'sendgrid'
  | 'mailgun'
  | 'ses'
  | 'custom';

export interface EmailConfig {
  service?: EmailServiceType;
  host?: string;
  port?: number;
  secure?: boolean;
  username?: string;
  password?: string;
  from?: string;
  replyTo?: string;
  connectionTimeout?: number;
  authMethod?: 'plain' | 'login' | 'oauth2';
}

export type StorageProvider = 'local' | 's3' | 'gcs' | 'azure' | 'cloudinary';

export interface StorageConfig {
  provider: StorageProvider;
  bucket?: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  cdnUrl?: string;
  pathPrefix?: string;
  maxFileSize?: string;
  allowedTypes?: string[];
}

export type CacheProvider = 'memory' | 'redis' | 'memcached';

export interface CacheConfig {
  provider: CacheProvider;
  host?: string;
  port?: number;
  password?: string;
  ttl?: number;
  prefix?: string;
  options?: Record<string, unknown>;
}

export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

export type LogTransport = 'console' | 'file' | 'database' | 'external';

export interface LoggingConfig {
  level: LogLevel;
  format?: 'json' | 'simple' | 'combined';
  transports: LogTransport[];
  filePath?: string;
  maxFileSize?: string;
  maxFiles?: number;
  colorize?: boolean;
  timestamp?: boolean;
}

export interface APIConfig {
  version: string;
  prefix?: string;
  docsUrl?: string;
  versioning?: boolean;
  defaultFormat?: 'json' | 'xml';
  compression?: boolean;
  timeout?: number;
}

export interface MonitoringConfig {
  healthCheck?: boolean;
  healthCheckPath?: string;
  metrics?: boolean;
  metricsPath?: string;
  apm?: {
    enabled: boolean;
    serviceName?: string;
    serverUrl?: string;
    apiKey?: string;
  };
}

export interface envConfig_Type {
  server: ServerConfig;
  database: DatabaseConfig;
  jwt: JWTConfig;
  cors?: CORSConfig;
  security?: SecurityConfig;
  email?: EmailConfig;
  storage?: StorageConfig;
  cache?: CacheConfig;
  logging?: LoggingConfig;
  api?: APIConfig;
  monitoring?: MonitoringConfig;
  custom?: Record<string, unknown>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// =================== CONSTANT TYPE OBJECT ===================

export const Config_Type = {
  server_Type: {} as ServerConfig,
  database_Type: {} as DatabaseConfig,
  jwt_Type: {} as JWTConfig,
  cors_Type: {} as CORSConfig,
  security_Type: {} as SecurityConfig,
  email_Type: {} as EmailConfig,
  storage_Type: {} as StorageConfig,
  envConfig_Type: {} as envConfig_Type,
  cache_Type: {} as CacheConfig,
  logging_Type: {} as LoggingConfig,
  api_Type: {} as APIConfig,
  configValidation_Type: {} as ValidationResult,
  monitoring_Type: {} as MonitoringConfig,
  custom_Type: {} as Record<string, unknown>,
};

// =================== EXPORTS ===================

export default Config_Type;

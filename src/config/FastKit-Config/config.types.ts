/**
 * FastKit Configuration Types
 *
 * This file contains all TypeScript type definitions for FastKit configuration.
 * These types are used throughout the application for type safety and IntelliSense.
 *
 * @fileoverview Core configuration types and interfaces
 * @version 1.0.0
 */

import { DatabaseConfig } from '../db/Db.type';

// ============================================================================
// Database Configuration Types
// ============================================================================

// ============================================================================
// JWT Configuration Types
// ============================================================================

/**
 * Supported JWT algorithms
 */
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

/**
 * JWT configuration interface
 */
export interface JWTConfig {
  /** JWT signing secret (required) */
  secret: string;
  /** Token expiration time (default: '24h') */
  expiresIn?: string;
  /** Refresh token secret */
  refreshSecret?: string;
  /** Refresh token expiration time */
  refreshExpiresIn?: string;
  /** JWT signing algorithm (default: 'HS256') */
  algorithm?: JWTAlgorithmType;
  /** JWT issuer */
  issuer?: string;
  /** JWT audience */
  audience?: string;
  /** JWT subject */
  subject?: string;
  /** Include not before claim */
  notBefore?: string;
  /** JWT ID */
  jwtid?: string;
}

// ============================================================================
// CORS Configuration Types
// ============================================================================

/**
 * HTTP methods for CORS
 */
export type HTTPMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

/**
 * CORS origin configuration
 */
export type CORSOriginType =
  | string
  | string[]
  | boolean
  | RegExp
  | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void);

/**
 * CORS configuration interface
 */
export interface CORSConfig {
  /** Allowed origins */
  origin?: CORSOriginType;
  /** Allowed HTTP methods */
  methods?: HTTPMethodType[];
  /** Allowed headers */
  allowedHeaders?: string[];
  /** Enable credentials */
  credentials?: boolean;
  /** Preflight cache duration in seconds */
  maxAge?: number;
  /** Pass preflight to next handler */
  preflightContinue?: boolean;
  /** Success status for OPTIONS requests */
  optionsSuccessStatus?: number;
  /** Exposed headers */
  exposedHeaders?: string[];
}

// ============================================================================
// Server Configuration Types
// ============================================================================

/**
 * Application environments
 */
export type EnvironmentType = 'development' | 'production' | 'test' | 'staging';

/**
 * Server configuration interface
 */
export interface ServerConfig {
  /** Server port number (required) */
  port: number;
  /** Server host address */
  host?: string;
  /** Application environment (required) */
  environment: EnvironmentType;
  /** Additional NODE_ENV value */
  nodeEnv?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Enable keep-alive */
  keepAlive?: boolean;
  /** Maximum request body size */
  bodyLimit?: string;
  /** Enable trust proxy */
  trustProxy?: boolean;
}

// ============================================================================
// Security Configuration Types
// ============================================================================

/**
 * Security configuration interface
 */
export interface SecurityConfig {
  /** Rate limiting window in milliseconds */
  rateLimitWindowMs?: number;
  /** Maximum requests per window */
  rateLimitMax?: number;
  /** Enable helmet middleware */
  helmet?: boolean;
  /** Enable compression */
  compression?: boolean;
  /** Enable morgan logging */
  morgan?: boolean;
  /** CSRF protection */
  csrf?: boolean;
  /** Session configuration */
  session?: {
    secret: string;
    name?: string;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  };
  /** Content Security Policy */
  csp?: Record<string, string[]>;
}

// ============================================================================
// Email Configuration Types
// ============================================================================

/**
 * Email service providers
 */
export type EmailServiceType =
  | 'gmail'
  | 'yahoo'
  | 'outlook'
  | 'sendgrid'
  | 'mailgun'
  | 'ses'
  | 'custom';

/**
 * Email configuration interface
 */
export interface EmailConfig {
  /** Email service provider */
  service?: EmailServiceType;
  /** SMTP host */
  host?: string;
  /** SMTP port */
  port?: number;
  /** Use secure connection (TLS) */
  secure?: boolean;
  /** SMTP username */
  username?: string;
  /** SMTP password or API key */
  password?: string;
  /** Default from address */
  from?: string;
  /** Default reply-to address */
  replyTo?: string;
  /** Connection timeout */
  connectionTimeout?: number;
  /** Authentication method */
  authMethod?: 'plain' | 'login' | 'oauth2';
}

// ============================================================================
// Storage Configuration Types
// ============================================================================

/**
 * Storage providers
 */
export type StorageProvider = 'local' | 's3' | 'gcs' | 'azure' | 'cloudinary';

/**
 * Storage configuration interface
 */
export interface StorageConfig {
  /** Storage provider */
  provider: StorageProvider;
  /** Storage bucket/container name */
  bucket?: string;
  /** Storage region */
  region?: string;
  /** Access key ID */
  accessKeyId?: string;
  /** Secret access key */
  secretAccessKey?: string;
  /** CDN URL */
  cdnUrl?: string;
  /** Upload path prefix */
  pathPrefix?: string;
  /** Maximum file size */
  maxFileSize?: string;
  /** Allowed file types */
  allowedTypes?: string[];
}

// ============================================================================
// Cache Configuration Types
// ============================================================================

/**
 * Cache providers
 */
export type CacheProvider = 'memory' | 'redis' | 'memcached';

/**
 * Cache configuration interface
 */
export interface CacheConfig {
  /** Cache provider */
  provider: CacheProvider;
  /** Cache host */
  host?: string;
  /** Cache port */
  port?: number;
  /** Cache password */
  password?: string;
  /** Default TTL in seconds */
  ttl?: number;
  /** Key prefix */
  prefix?: string;
  /** Connection options */
  options?: Record<string, unknown>;
}

// ============================================================================
// Logging Configuration Types
// ============================================================================

/**
 * Log levels
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

/**
 * Log transports
 */
export type LogTransport = 'console' | 'file' | 'database' | 'external';

/**
 * Logging configuration interface
 */
export interface LoggingConfig {
  /** Log level */
  level: LogLevel;
  /** Log format */
  format?: 'json' | 'simple' | 'combined';
  /** Log transports */
  transports: LogTransport[];
  /** Log file path */
  filePath?: string;
  /** Maximum log file size */
  maxFileSize?: string;
  /** Maximum number of log files */
  maxFiles?: number;
  /** Enable colorization */
  colorize?: boolean;
  /** Include timestamp */
  timestamp?: boolean;
}

// ============================================================================
// API Configuration Types
// ============================================================================

/**
 * API configuration interface
 */
export interface APIConfig {
  /** API version */
  version: string;
  /** API prefix */
  prefix?: string;
  /** API documentation URL */
  docsUrl?: string;
  /** Enable API versioning */
  versioning?: boolean;
  /** Default response format */
  defaultFormat?: 'json' | 'xml';
  /** Enable compression */
  compression?: boolean;
  /** Response timeout */
  timeout?: number;
}

// ============================================================================
// Monitoring Configuration Types
// ============================================================================

/**
 * Monitoring configuration interface
 */
export interface MonitoringConfig {
  /** Enable health checks */
  healthCheck?: boolean;
  /** Health check endpoint */
  healthCheckPath?: string;
  /** Enable metrics collection */
  metrics?: boolean;
  /** Metrics endpoint */
  metricsPath?: string;
  /** Enable application performance monitoring */
  apm?: {
    enabled: boolean;
    serviceName?: string;
    serverUrl?: string;
    apiKey?: string;
  };
}

// ============================================================================
// Main Configuration Interface
// ============================================================================

/**
 * Main FastKit configuration interface
 */
export interface FastKitConfigData {
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

// ============================================================================
// Environment Configuration Type
// ============================================================================

/**
 * Environment-specific configuration
 */
export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  isStaging: boolean;
  environment: EnvironmentType;
  server: ServerConfig;
  database: DatabaseConfig;
  jwt: JWTConfig;
  cors: CORSConfig;
  security: SecurityConfig;
  email: EmailConfig;
}

// ============================================================================
// Configuration Options Types
// ============================================================================

/**
 * Configuration file options
 */
export interface ConfigOptions {
  /** Environment file path */
  envPath?: string;
  /** Enable validation */
  validate?: boolean;
  /** Required environment variables */
  required?: string[];
  /** Enable backup creation */
  backup?: boolean;
  /** Configuration schema */
  schema?: Record<string, unknown>;
}

/**
 * Configuration validation result
 */
export interface ValidationResult {
  /** Validation success status */
  isValid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validated configuration */
  config?: FastKitConfigData;
}

/**
 * Configuration update options
 */
export interface UpdateOptions {
  /** Merge with existing configuration */
  merge?: boolean;
  /** Validate after update */
  validate?: boolean;
  /** Create backup before update */
  backup?: boolean;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Make all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties required
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Configuration with required fields
 */
export type ValidatedConfig = RequiredFields<FastKitConfigData, 'server' | 'database' | 'jwt'>;

/**
 * Environment variable mapping
 */
export type EnvironmentVariables = Record<string, string | number | boolean>;

// Default export for convenience
export default FastKitConfigData;

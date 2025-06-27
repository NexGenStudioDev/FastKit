/**
 * FastKit Configuration Validation Schemas
 *
 * This file contains Zod validation schemas for all FastKit configuration types.
 * These schemas provide runtime validation and type safety for configuration data.
 *
 * @fileoverview Configuration validation using Zod
 * @version 1.0.0
 */

import { z } from 'zod';
import type {
  JWTConfig,
  ServerConfig,
  FastKitConfigData,
  ValidationResult,
  HTTPMethodType,
} from './config.types';
import { EnvType } from '../../type/env.types';
import { DatabaseConfig } from '../db/Db.type';

// ============================================================================
// Base Validation Schemas
// ============================================================================

/**
 * Port number validation
 */
const portSchema = z.number().int().min(1).max(65535);

/**
 * Non-empty string validation
 */
const nonEmptyString = z.string().min(1);

// ============================================================================
// Database Configuration Schema
// ============================================================================

export const databaseConfigSchema = z
  .object({
    type: z.enum(['mongodb', 'mysql', 'postgresql', 'sqlite', 'redis']),
    host: z.string().optional(),
    port: portSchema.optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    databaseName: z.string().optional(),
    url: z.string().optional(),
    poolSize: z.number().positive().optional(),
    connectionTimeout: z.number().positive().optional(),
    ssl: z.boolean().optional(),
    options: z.record(z.unknown()).optional(),
  })
  .refine((data) => data.url || (data.host && data.databaseName), {
    message: "Either 'url' or both 'host' and 'databaseName' must be provided",
    path: ['url'],
  });

// ============================================================================
// JWT Configuration Schema
// ============================================================================

export const jwtConfigSchema = z.object({
  secret: nonEmptyString.min(32, 'JWT secret must be at least 32 characters long'),
  expiresIn: z.string().optional().default('24h'),
  refreshSecret: z.string().optional(),
  refreshExpiresIn: z.string().optional(),
  algorithm: z
    .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'])
    .optional()
    .default('HS256'),
  issuer: z.string().optional(),
  audience: z.string().optional(),
  subject: z.string().optional(),
  notBefore: z.string().optional(),
  jwtid: z.string().optional(),
});

// ============================================================================
// CORS Configuration Schema
// ============================================================================

export const corsConfigSchema = z.object({
  origin: z.union([z.string(), z.array(z.string()), z.boolean(), z.instanceof(RegExp)]).optional(),
  methods: z.array(z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])).optional(),
  allowedHeaders: z.array(z.string()).optional(),
  credentials: z.boolean().optional(),
  maxAge: z.number().positive().optional(),
  preflightContinue: z.boolean().optional(),
  optionsSuccessStatus: z.number().int().min(200).max(299).optional(),
  exposedHeaders: z.array(z.string()).optional(),
});

// ============================================================================
// Server Configuration Schema
// ============================================================================

export const serverConfigSchema = z.object({
  port: portSchema,
  host: z.string().optional().default('localhost'),
  environment: z.enum(['development', 'production', 'test', 'staging']),
  nodeEnv: z.string().optional(),
  timeout: z.number().positive().optional(),
  keepAlive: z.boolean().optional(),
  bodyLimit: z.string().optional(),
  trustProxy: z.boolean().optional(),
});

// ============================================================================
// Security Configuration Schema
// ============================================================================

export const securityConfigSchema = z.object({
  rateLimitWindowMs: z.number().positive().optional(),
  rateLimitMax: z.number().positive().optional(),
  helmet: z.boolean().optional(),
  compression: z.boolean().optional(),
  morgan: z.boolean().optional(),
  csrf: z.boolean().optional(),
  session: z
    .object({
      secret: nonEmptyString,
      name: z.string().optional(),
      maxAge: z.number().positive().optional(),
      secure: z.boolean().optional(),
      httpOnly: z.boolean().optional(),
      sameSite: z.enum(['strict', 'lax', 'none']).optional(),
    })
    .optional(),
  csp: z.record(z.array(z.string())).optional(),
});

// ============================================================================
// Email Configuration Schema
// ============================================================================

export const emailConfigSchema = z
  .object({
    service: z
      .enum(['gmail', 'yahoo', 'outlook', 'sendgrid', 'mailgun', 'ses', 'custom'])
      .optional(),
    host: z.string().optional(),
    port: portSchema.optional(),
    secure: z.boolean().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    from: z.string().optional(),
    replyTo: z.string().optional(),
    connectionTimeout: z.number().positive().optional(),
    authMethod: z.enum(['plain', 'login', 'oauth2']).optional(),
  })
  .refine(
    (data) => {
      if (data.service === 'custom') {
        return data.host && data.port;
      }
      return true;
    },
    {
      message: "Custom email service requires 'host' and 'port'",
      path: ['host'],
    },
  );

// ============================================================================
// Main Configuration Schema
// ============================================================================

export const fastKitConfigSchema = z.object({
  server: serverConfigSchema,
  database: databaseConfigSchema,
  jwt: jwtConfigSchema,
  cors: corsConfigSchema.optional(),
  security: securityConfigSchema.optional(),
  email: emailConfigSchema.optional(),
  custom: z.record(z.unknown()).optional(),
});

// ============================================================================
// Environment Variables Validation Schema
// ============================================================================

/**
 * Schema for validating environment variables directly from process.env
 */
export const envVarsSchema = z
  .object({
    // Server Environment Variables
    PORT: z
      .string()
      .default('3000')
      .transform((val) => parseInt(val))
      .pipe(portSchema),
    HOST: z.string().default('localhost'),
    NODE_ENV: z.enum(['development', 'production', 'test', 'staging']).default('development'),
    ENVIRONMENT: z.string().optional(),

    // Database Environment Variables
    DATABASE_TYPE: z.enum(['mongodb', 'mysql', 'postgresql', 'sqlite', 'redis']).default('mongodb'),
    DATABASE_URL: z.string().optional(),
    DATABASE_HOST: z.string().optional(),
    DATABASE_PORT: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    DATABASE_USERNAME: z.string().optional(),
    DATABASE_PASSWORD: z.string().optional(),
    DATABASE_NAME: z.string().optional(),
    DATABASE_POOL_SIZE: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    DATABASE_CONNECTION_TIMEOUT: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    DATABASE_SSL: z
      .string()
      .optional()
      .transform((val) => val === 'true'),

    // JWT Environment Variables
    JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters long'),
    JWT_EXPIRES_IN: z.string().default('24h'),
    JWT_REFRESH_SECRET: z.string().optional(),
    JWT_REFRESH_EXPIRES_IN: z.string().optional(),
    JWT_ALGORITHM: z
      .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'])
      .default('HS256'),
    JWT_ISSUER: z.string().optional(),
    JWT_AUDIENCE: z.string().optional(),
    JWT_SUBJECT: z.string().optional(),

    // CORS Environment Variables (optional)
    CORS_ORIGIN: z.string().optional(),
    CORS_METHODS: z.string().optional(),
    CORS_ALLOWED_HEADERS: z.string().optional(),
    CORS_CREDENTIALS: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    CORS_MAX_AGE: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),

    // Security Environment Variables (optional)
    RATE_LIMIT_WINDOW_MS: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    RATE_LIMIT_MAX: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    SECURITY_HELMET: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    SECURITY_COMPRESSION: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    SECURITY_MORGAN: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    SECURITY_CSRF: z
      .string()
      .optional()
      .transform((val) => val === 'true'),

    // Email Environment Variables (optional)
    EMAIL_SERVICE: z
      .enum(['gmail', 'yahoo', 'outlook', 'sendgrid', 'mailgun', 'ses', 'custom'])
      .optional(),
    EMAIL_HOST: z.string().optional(),
    EMAIL_PORT: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    EMAIL_SECURE: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    EMAIL_USERNAME: z.string().optional(),
    EMAIL_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().optional(),

    // Server Configuration (optional)
    SERVER_TIMEOUT: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .pipe(z.number().optional()),
    SERVER_KEEP_ALIVE: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
    SERVER_BODY_LIMIT: z.string().optional(),
    SERVER_TRUST_PROXY: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
  })
  .refine(
    (data) => {
      // If DATABASE_URL is not provided, require DATABASE_HOST and DATABASE_NAME for non-mongodb
      if (!data.DATABASE_URL && data.DATABASE_TYPE !== 'mongodb') {
        return data.DATABASE_HOST && data.DATABASE_NAME;
      }
      return true;
    },
    {
      message:
        'For non-MongoDB databases, either DATABASE_URL or both DATABASE_HOST and DATABASE_NAME must be provided',
      path: ['DATABASE_URL'],
    },
  );

// ============================================================================
// Main Environment Validation Function
// ============================================================================

/**
 * Validate entire .env data and return typed configuration
 */
export function validateEnvData(EnvConstants?: EnvType): {
  isValid: boolean;
  errors: string[];
  config?: FastKitConfigData;
  envVars?: z.infer<typeof envVarsSchema>;
} {
  try {
    // Use provided envData or process.env
    const env = EnvConstants || process.env;

    // Validate environment variables
    const validatedEnv = envVarsSchema.parse(env);

    // Transform environment variables to FastKitConfigData format
    const config: FastKitConfigData = {
      server: {
        port: validatedEnv.PORT,
        host: validatedEnv.HOST,
        environment: validatedEnv.NODE_ENV,
        nodeEnv: validatedEnv.ENVIRONMENT,
        timeout: validatedEnv.SERVER_TIMEOUT,
        keepAlive: validatedEnv.SERVER_KEEP_ALIVE,
        bodyLimit: validatedEnv.SERVER_BODY_LIMIT,
        trustProxy: validatedEnv.SERVER_TRUST_PROXY,
      },
      database: {
        type: validatedEnv.DATABASE_TYPE,
        url: validatedEnv.DATABASE_URL,
        host: validatedEnv.DATABASE_HOST,
        port: validatedEnv.DATABASE_PORT,
        username: validatedEnv.DATABASE_USERNAME,
        password: validatedEnv.DATABASE_PASSWORD,
        databaseName: validatedEnv.DATABASE_NAME,
        poolSize: validatedEnv.DATABASE_POOL_SIZE,
        connectionTimeout: validatedEnv.DATABASE_CONNECTION_TIMEOUT,
        ssl: validatedEnv.DATABASE_SSL,
      },
      jwt: {
        secret: validatedEnv.JWT_SECRET,
        expiresIn: validatedEnv.JWT_EXPIRES_IN,
        refreshSecret: validatedEnv.JWT_REFRESH_SECRET,
        refreshExpiresIn: validatedEnv.JWT_REFRESH_EXPIRES_IN,
        algorithm: validatedEnv.JWT_ALGORITHM,
        issuer: validatedEnv.JWT_ISSUER,
        audience: validatedEnv.JWT_AUDIENCE,
        subject: validatedEnv.JWT_SUBJECT,
      },
    };

    // Add optional configurations if environment variables are present
    if (validatedEnv.CORS_ORIGIN || validatedEnv.CORS_METHODS) {
      config.cors = {
        origin: validatedEnv.CORS_ORIGIN ? parseCorsOrigin(validatedEnv.CORS_ORIGIN) : undefined,
        methods: validatedEnv.CORS_METHODS
          ? (validatedEnv.CORS_METHODS.split(',') as HTTPMethodType[])
          : undefined,
        allowedHeaders: validatedEnv.CORS_ALLOWED_HEADERS
          ? validatedEnv.CORS_ALLOWED_HEADERS.split(',')
          : undefined,
        credentials: validatedEnv.CORS_CREDENTIALS,
        maxAge: validatedEnv.CORS_MAX_AGE,
      };
    }

    if (validatedEnv.RATE_LIMIT_WINDOW_MS || validatedEnv.SECURITY_HELMET !== undefined) {
      config.security = {
        rateLimitWindowMs: validatedEnv.RATE_LIMIT_WINDOW_MS,
        rateLimitMax: validatedEnv.RATE_LIMIT_MAX,
        helmet: validatedEnv.SECURITY_HELMET,
        compression: validatedEnv.SECURITY_COMPRESSION,
        morgan: validatedEnv.SECURITY_MORGAN,
        csrf: validatedEnv.SECURITY_CSRF,
      };
    }

    if (validatedEnv.EMAIL_SERVICE || validatedEnv.EMAIL_HOST) {
      config.email = {
        service: validatedEnv.EMAIL_SERVICE,
        host: validatedEnv.EMAIL_HOST,
        port: validatedEnv.EMAIL_PORT,
        secure: validatedEnv.EMAIL_SECURE,
        username: validatedEnv.EMAIL_USERNAME,
        password: validatedEnv.EMAIL_PASSWORD,
        from: validatedEnv.EMAIL_FROM,
      };
    }

    // Add custom environment variables
    const customConfig: Record<string, unknown> = {};
    Object.keys(env).forEach((key) => {
      if (key.startsWith('CUSTOM_') || key.startsWith('APP_')) {
        const value = env[key as keyof typeof env];
        if (value !== undefined) {
          customConfig[key] = value;
        }
      }
    });
    if (Object.keys(customConfig).length > 0) {
      config.custom = customConfig;
    }

    // Final validation with FastKit schema
    const finalValidation = validateConfig(config);
    if (!finalValidation.isValid) {
      return {
        isValid: false,
        errors: finalValidation.errors,
      };
    }

    return {
      isValid: true,
      errors: [],
      config: finalValidation.config,
      envVars: validatedEnv,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : 'Unknown validation error'],
    };
  }
}

/**
 * Helper function to parse CORS origin
 */
function parseCorsOrigin(origin: string): string | string[] | boolean {
  if (origin === 'true') return true;
  if (origin === 'false') return false;
  if (origin.includes(',')) return origin.split(',').map((o) => o.trim());
  return origin;
}

// ============================================================================
// Individual Validation Functions
// ============================================================================

/**
 * Validate FastKit configuration
 */
export function validateConfig(config: unknown): ValidationResult {
  try {
    const validatedConfig = fastKitConfigSchema.parse(config);
    return {
      isValid: true,
      errors: [],
      config: validatedConfig as FastKitConfigData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      isValid: false,
      errors: ['Unknown validation error'],
    };
  }
}

/**
 * Validate server configuration
 */
export function validateServerConfig(config: unknown): {
  isValid: boolean;
  errors: string[];
  config?: ServerConfig;
} {
  try {
    const validatedConfig = serverConfigSchema.parse(config);
    return {
      isValid: true,
      errors: [],
      config: validatedConfig,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      isValid: false,
      errors: ['Unknown validation error'],
    };
  }
}

/**
 * Validate database configuration
 */
export function validateDatabaseConfig(config: unknown): {
  isValid: boolean;
  errors: string[];
  config?: DatabaseConfig;
} {
  try {
    const validatedConfig = databaseConfigSchema.parse(config);
    return {
      isValid: true,
      errors: [],
      config: validatedConfig,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      isValid: false,
      errors: ['Unknown validation error'],
    };
  }
}

/**
 * Validate JWT configuration
 */
export function validateJWTConfig(config: unknown): {
  isValid: boolean;
  errors: string[];
  config?: JWTConfig;
} {
  try {
    const validatedConfig = jwtConfigSchema.parse(config);
    return {
      isValid: true,
      errors: [],
      config: validatedConfig,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      isValid: false,
      errors: ['Unknown validation error'],
    };
  }
}

/**
 * Validate required environment variables
 */
export function validateRequiredEnvVars(requiredVars: string[] = []): {
  isValid: boolean;
  missing: string[];
  errors: string[];
} {
  const defaultRequired = ['JWT_SECRET'];
  const allRequired = [...defaultRequired, ...requiredVars];
  const missing: string[] = [];

  allRequired.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  return {
    isValid: missing.length === 0,
    missing,
    errors: missing.map((varName) => `Missing required environment variable: ${varName}`),
  };
}

export function isFastKitConfig(config: unknown): config is FastKitConfigData {
  return validateConfig(config).isValid;
}

/**
 * Type guard for server configuration
 */
export function isServerConfig(config: unknown): config is ServerConfig {
  return validateServerConfig(config).isValid;
}

/**
 * Type guard for database configuration
 */
export function isDatabaseConfig(config: unknown): config is DatabaseConfig {
  return validateDatabaseConfig(config).isValid;
}

/**
 * Type guard for JWT configuration
 */
export function isJWTConfig(config: unknown): config is JWTConfig {
  return validateJWTConfig(config).isValid;
}

// ============================================================================
// Export all schemas and validators
// ============================================================================

export { z as zod, fastKitConfigSchema as schema };

// Default export with unified validation
export default {
  // Main validation functions
  validateEnvData,
  validateConfig,
  validateRequiredEnvVars,
  // Individual validators
  validateServerConfig,
  validateDatabaseConfig,
  validateJWTConfig,
  // Type guards
  isFastKitConfig,
  isServerConfig,
  isDatabaseConfig,
  isJWTConfig,
};

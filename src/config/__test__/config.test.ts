/**
 * FastKit Configuration System - Complete Test Suite
 *
 * Comprehensive test cases for the FastKit configuration system including
 * type validation, Zod schema validation, and configuration management.
 * Tests use .env.test files and process.env exclusively.
 *
 * @fileoverview Complete test suite for FastKit configuration system
 * @version 1.0.0
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

// Import the modules we're testing
import { FastKitConfig } from '../FastKit.config';
import {
  validateConfig,
  validateServerConfig,
  validateJWTConfig,
  fastKitConfigSchema,
  serverConfigSchema,

  jwtConfigSchema,
} from '../config.validation';

import type {
  EnvironmentType,
  JWTAlgorithmType,
} from '../config.types';

// Test constants
const TEST_ENV_FILE = path.join(process.cwd(), '.env.test');

/**
 * Valid test environment variables
 */
const validEnvVars = {
  PORT: '3000',
  HOST: 'localhost',
  NODE_ENV: 'test',
  DATABASE_TYPE: 'mongodb',
  DATABASE_URL: 'mongodb://localhost:27017/testdb',
  JWT_SECRET: 'test-secret-key-minimum-32-characters-long',
  JWT_EXPIRES_IN: '1h',
  JWT_ALGORITHM: 'HS256',
};

/**
 * Test helper functions
 */
const testHelpers = {
  /**
   * Clean up test files and environment variables
   */
  cleanupTestFiles: (): void => {
    try {
      if (fs.existsSync(TEST_ENV_FILE)) {
        fs.unlinkSync(TEST_ENV_FILE);
      }
    } catch {
      // Ignore cleanup errors
    }
  },

  /**
   * Create a .env.test file with the provided content
   */
  createTestEnvFile: (content: string): void => {
    fs.writeFileSync(TEST_ENV_FILE, content);
  },

  /**
   * Create .env.test file from environment variables object
   */
  createEnvFromObject: (envVars: Record<string, string>): void => {
    const content = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    testHelpers.createTestEnvFile(content);
  },

  /**
   * Read .env.test file content
   */
  readTestEnvFile: (): string => {
    return fs.readFileSync(TEST_ENV_FILE, 'utf8');
  },

  /**
   * Check if .env.test file exists
   */
  fileExists: (): boolean => {
    return fs.existsSync(TEST_ENV_FILE);
  },

  /**
   * Set environment variables in process.env
   */
  setEnvVars: (envVars: Record<string, string>): void => {
    Object.entries(envVars).forEach(([key, value]) => {
      process.env[key] = value;
    });
  },

  /**
   * Clean up environment variables from process.env
   */
  cleanupEnvVars: (): void => {
    const envVarsToClean = [
      'PORT', 'HOST', 'NODE_ENV', 'ENVIRONMENT',
      'DATABASE_TYPE', 'DATABASE_URL', 'DATABASE_HOST', 'DATABASE_PORT',
      'DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_NAME',
      'JWT_SECRET', 'JWT_EXPIRES_IN', 'JWT_ALGORITHM', 'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRES_IN', 'JWT_ISSUER', 'JWT_AUDIENCE',
      'CORS_ORIGIN', 'CORS_METHODS', 'CORS_ALLOWED_HEADERS', 'CORS_CREDENTIALS',
      'SECURITY_HELMET', 'SECURITY_COMPRESSION', 'SECURITY_MORGAN',
      'EMAIL_SERVICE', 'EMAIL_HOST', 'EMAIL_USERNAME', 'EMAIL_PASSWORD',
    ];
    envVarsToClean.forEach((varName) => {
      delete process.env[varName];
    });
  },

  /**
   * Backup current process.env values for restoration
   */
  backupEnv: (): Record<string, string | undefined> => {
    const envVarsToBackup = [
      'PORT', 'HOST', 'NODE_ENV', 'ENVIRONMENT',
      'DATABASE_TYPE', 'DATABASE_URL', 'DATABASE_HOST', 'DATABASE_PORT',
      'DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_NAME',
      'JWT_SECRET', 'JWT_EXPIRES_IN', 'JWT_ALGORITHM', 'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRES_IN', 'JWT_ISSUER', 'JWT_AUDIENCE',
      'CORS_ORIGIN', 'CORS_METHODS', 'CORS_ALLOWED_HEADERS', 'CORS_CREDENTIALS',
      'SECURITY_HELMET', 'SECURITY_COMPRESSION', 'SECURITY_MORGAN',
      'EMAIL_SERVICE', 'EMAIL_HOST', 'EMAIL_USERNAME', 'EMAIL_PASSWORD',
    ];
    const backup: Record<string, string | undefined> = {};
    envVarsToBackup.forEach((varName) => {
      backup[varName] = process.env[varName];
    });
    return backup;
  },

  /**
   * Restore process.env from backup
   */
  restoreEnv: (backup: Record<string, string | undefined>): void => {
    Object.entries(backup).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  },
};

// ============================================================================
// Main Test Suite
// ============================================================================

describe('FastKit Configuration System', () => {
  let envBackup: Record<string, string | undefined>;

  beforeEach(() => {
    // Backup current environment
    envBackup = testHelpers.backupEnv();
    
    // Clean up any existing test files and environment variables
    testHelpers.cleanupTestFiles();
    testHelpers.cleanupEnvVars();
  });

  afterEach(() => {
    // Clean up test files and restore environment
    testHelpers.cleanupTestFiles();
    testHelpers.restoreEnv(envBackup);
  });

  // ==========================================================================
  // Environment Loading Tests
  // ==========================================================================

  describe('Environment Loading from .env.test files', () => {
    test('should load and validate config from .env.test file', () => {
      // Create .env.test file
      testHelpers.createEnvFromObject(validEnvVars);
      expect(testHelpers.fileExists()).toBe(true);

      // Load configuration using .env.test file
      const config = new FastKitConfig(TEST_ENV_FILE);
      const configData = config.getConfig();

      // Verify configuration was loaded correctly
      expect(configData.server.port).toBe(3000);
      expect(configData.server.host).toBe('localhost');
      expect(configData.server.environment).toBe('test');
      expect(configData.database.type).toBe('mongodb');
      expect(configData.database.url).toBe('mongodb://localhost:27017/testdb');
      expect(configData.jwt.secret).toBe('test-secret-key-minimum-32-characters-long');
      expect(configData.jwt.expiresIn).toBe('1h');
      expect(configData.jwt.algorithm).toBe('HS256');
    });

    test('should load config from process.env when no file specified', () => {
      // Set environment variables directly in process.env
      testHelpers.setEnvVars(validEnvVars);

      // Load configuration from process.env
      const config = FastKitConfig.fromEnv();
      const configData = config.getConfig();

      // Verify configuration was loaded correctly
      expect(configData.server.port).toBe(3000);
      expect(configData.server.environment).toBe('test');
      expect(configData.database.type).toBe('mongodb');
      expect(configData.jwt.secret).toBe('test-secret-key-minimum-32-characters-long');
    });

    test('should use default values when environment variables are missing', () => {
      // Only set required JWT secret
      const minimalEnv = {
        JWT_SECRET: 'test-secret-key-minimum-32-characters-long',
      };
      testHelpers.createEnvFromObject(minimalEnv);

      const config = new FastKitConfig(TEST_ENV_FILE);
      const configData = config.getConfig();

      // Verify defaults are used
      expect(configData.server.port).toBe(3000); // default
      expect(configData.server.host).toBe('localhost'); // default
      expect(configData.server.environment).toBe('development'); // default
      expect(configData.database.type).toBe('mongodb'); // default
      expect(configData.jwt.algorithm).toBe('HS256'); // default
    });

    test('should handle .env.test file with complex configuration', () => {
      const complexEnv = {
        PORT: '8080',
        HOST: '0.0.0.0',
        NODE_ENV: 'production',
        DATABASE_TYPE: 'postgresql',
        DATABASE_HOST: 'db.example.com',
        DATABASE_PORT: '5432',
        DATABASE_USERNAME: 'dbuser',
        DATABASE_PASSWORD: 'dbpass',
        DATABASE_NAME: 'proddb',
        DATABASE_SSL: 'true',
        JWT_SECRET: 'production-secret-key-32-characters-long',
        JWT_EXPIRES_IN: '15m',
        JWT_REFRESH_SECRET: 'refresh-secret-key-32-characters-long',
        JWT_REFRESH_EXPIRES_IN: '7d',
        JWT_ALGORITHM: 'HS512',
        JWT_ISSUER: 'myapp.com',
        JWT_AUDIENCE: 'myapp-users',
        CORS_ORIGIN: 'https://myapp.com,https://admin.myapp.com',
        CORS_METHODS: 'GET,POST,PUT,DELETE',
        CORS_ALLOWED_HEADERS: 'Content-Type,Authorization',
        CORS_CREDENTIALS: 'true',
        RATE_LIMIT_WINDOW_MS: '900000',
        RATE_LIMIT_MAX: '100',
        SECURITY_HELMET: 'true',
        SECURITY_COMPRESSION: 'true',
        SECURITY_MORGAN: 'false',
        EMAIL_SERVICE: 'sendgrid',
        EMAIL_USERNAME: 'apikey',
        EMAIL_PASSWORD: 'sg-key',
        EMAIL_FROM: 'noreply@myapp.com',
      };

      testHelpers.createEnvFromObject(complexEnv);
      const config = new FastKitConfig(TEST_ENV_FILE);
      const configData = config.getConfig();

      // Verify complex configuration
      expect(configData.server.port).toBe(8080);
      expect(configData.server.host).toBe('0.0.0.0');
      expect(configData.server.environment).toBe('production');
      expect(configData.database.type).toBe('postgresql');
      expect(configData.database.host).toBe('db.example.com');
      expect(configData.database.port).toBe(5432);
      expect(configData.database.username).toBe('dbuser');
      expect(configData.database.password).toBe('dbpass');
      expect(configData.database.name).toBe('proddb');
      expect(configData.database.ssl).toBe(true);
      expect(configData.jwt.secret).toBe('production-secret-key-32-characters-long');
      expect(configData.jwt.expiresIn).toBe('15m');
      expect(configData.jwt.refreshSecret).toBe('refresh-secret-key-32-characters-long');
      expect(configData.jwt.refreshExpiresIn).toBe('7d');
      expect(configData.jwt.algorithm).toBe('HS512');
      expect(configData.jwt.issuer).toBe('myapp.com');
      expect(configData.jwt.audience).toBe('myapp-users');
    });

      const config = FastKitConfig.fromEnv();
      const configData = config.getConfig();

      expect(configData.server.port).toBe(8080);
      expect(configData.server.host).toBe('0.0.0.0');
      expect(configData.server.environment).toBe('production');
      expect(configData.database.type).toBe('postgresql');
      expect(configData.database.host).toBe('db.example.com');
      expect(configData.database.port).toBe(5432);
      expect(configData.database.ssl).toBe(true);
      expect(configData.jwt.algorithm).toBe('HS512');
      expect(configData.jwt.issuer).toBe('myapp.com');
      expect(configData.cors?.origin).toEqual(['https://myapp.com', 'https://admin.myapp.com']);
      expect(configData.cors?.credentials).toBe(true);
      expect(configData.security?.helmet).toBe(true);
      expect(configData.security?.morgan).toBe(false);
      expect(configData.email?.service).toBe('sendgrid');
    });
  });

  // ==========================================================================
  // Configuration Validation Tests
  // ==========================================================================

  describe('Configuration Validation', () => {
    test('should validate configuration on creation', () => {
      testHelpers.createEnvFromObject(validEnvVars);

      expect(() => {
        new FastKitConfig(TEST_ENV_FILE);
      }).not.toThrow();
    });

    test('should reject invalid configuration', () => {
      const invalidEnv = {
        PORT: '-1', // Invalid port
        NODE_ENV: 'invalid-env', // Invalid environment
        DATABASE_TYPE: 'invalid-db', // Invalid database type
        JWT_SECRET: 'short', // Too short secret
      };
      testHelpers.createEnvFromObject(invalidEnv);

      expect(() => {
        new FastKitConfig(TEST_ENV_FILE);
      }).toThrow();
    });

    test('should validate port ranges', () => {
      const invalidPortEnv = {
        ...validEnvVars,
        PORT: '70000', // Port > 65535
      };
      testHelpers.createEnvFromObject(invalidPortEnv);

      expect(() => {
        new FastKitConfig(TEST_ENV_FILE);
      }).toThrow();
    });

    test('should validate environment types', () => {
      const validEnvironments = ['development', 'production', 'test', 'staging'];

      validEnvironments.forEach((env) => {
        testHelpers.cleanupEnvVars();
        const envVars = { ...validEnvVars, NODE_ENV: env };
        testHelpers.createEnvFromObject(envVars);

        expect(() => {
          new FastKitConfig(TEST_ENV_FILE);
        }).not.toThrow();
      });
    });

    test('should validate database types', () => {
      const validDatabases = ['mongodb', 'mysql', 'postgresql', 'sqlite', 'redis'];

      validDatabases.forEach((db) => {
        testHelpers.cleanupEnvVars();
        const envVars = {
          ...validEnvVars,
          DATABASE_TYPE: db,
          DATABASE_URL: `${db}://localhost/test`,
        };
        testHelpers.createEnvFromObject(envVars);

        expect(() => {
          new FastKitConfig(TEST_ENV_FILE);
        }).not.toThrow();
      });
    });

    test('should validate JWT algorithms', () => {
      const validAlgorithms = ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'];

      validAlgorithms.forEach((algorithm) => {
        testHelpers.cleanupEnvVars();
        const envVars = { ...validEnvVars, JWT_ALGORITHM: algorithm };
        testHelpers.createEnvFromObject(envVars);

        expect(() => {
          new FastKitConfig(TEST_ENV_FILE);
        }).not.toThrow();
      });
    });
  });

  // ==========================================================================
  // Static Method Tests
  // ==========================================================================

  describe('Static Methods', () => {
    test('should validate environment configuration', () => {
      testHelpers.setEnvVars(validEnvVars);

      const result = FastKitConfig.validateEnv();
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.config).toBeDefined();
    });

    test('should return validation errors for invalid environment', () => {
      const invalidEnv = {
        PORT: '-1',
        DATABASE_TYPE: 'invalid',
        JWT_SECRET: 'short',
      };
      testHelpers.setEnvVars(invalidEnv);

      const result = FastKitConfig.validateEnv();
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.config).toBeUndefined();
    });

    test('should generate sample .env file', () => {
      const samplePath = TEST_ENV_EXAMPLE;
      FastKitConfig.generateSampleEnv(samplePath);

      expect(testHelpers.fileExists(samplePath)).toBe(true);
      const content = fs.readFileSync(samplePath, 'utf8');
      expect(content).toContain('PORT=3000');
      expect(content).toContain('JWT_SECRET=');
      expect(content).toContain('DATABASE_TYPE=mongodb');
    });
  });

  // ==========================================================================
  // Configuration Update Tests
  // ==========================================================================

  describe('Configuration Updates', () => {
    test('should update configuration', () => {
      testHelpers.setEnvVars(validEnvVars);
      const config = FastKitConfig.fromEnv();

      const updates = {
        server: { port: 8080, host: '0.0.0.0', environment: 'production' as EnvironmentType },
      };

      config.updateConfig(updates);
      const updatedConfig = config.getConfig();

      expect(updatedConfig.server.port).toBe(8080);
      expect(updatedConfig.server.host).toBe('0.0.0.0');
      expect(updatedConfig.server.environment).toBe('production');
    });

    test('should validate updates', () => {
      testHelpers.setEnvVars(validEnvVars);
      const config = FastKitConfig.fromEnv();

      const invalidUpdates = {
        server: { port: -1, host: 'localhost', environment: 'test' as EnvironmentType },
      };

      expect(() => {
        config.updateConfig(invalidUpdates);
      }).toThrow();
    });

    test('should reload configuration from environment', () => {
      testHelpers.setEnvVars(validEnvVars);
      const config = FastKitConfig.fromEnv();

      expect(config.getConfig().server.port).toBe(3000);

      // Change environment variable
      process.env.PORT = '9000';
      config.reload();

      expect(config.getConfig().server.port).toBe(9000);
    });
  });

  // ==========================================================================
  // Schema Validation Tests
  // ==========================================================================

  describe('Schema Validation', () => {
    test('should validate server config schema', () => {
      const validServerConfig: ServerConfig = {
        port: 3000,
        host: 'localhost',
        environment: 'development',
      };

      const result = serverConfigSchema.safeParse(validServerConfig);
      expect(result.success).toBe(true);
    });

    test('should validate database config schema', () => {
      const validDatabaseConfig: DatabaseConfig = {
        type: 'mongodb',
        url: 'mongodb://localhost:27017/testdb',
      };

      const result = databaseConfigSchema.safeParse(validDatabaseConfig);
      expect(result.success).toBe(true);
    });

    test('should validate JWT config schema', () => {
      const validJWTConfig: JWTConfig = {
        secret: 'test-secret-key-minimum-32-characters-long',
        expiresIn: '24h',
        algorithm: 'HS256',
      };

      const result = jwtConfigSchema.safeParse(validJWTConfig);
      expect(result.success).toBe(true);
    });

    test('should validate complete config schema', () => {
      const validConfig: FastKitConfigData = {
        server: {
          port: 3000,
          host: 'localhost',
          environment: 'test',
        },
        database: {
          type: 'mongodb',
          url: 'mongodb://localhost:27017/testdb',
        },
        jwt: {
          secret: 'test-secret-key-minimum-32-characters-long',
          expiresIn: '1h',
          algorithm: 'HS256',
        },
      };

      const result = fastKitConfigSchema.safeParse(validConfig);
      expect(result.success).toBe(true);
    });
  });

  // ==========================================================================
  // Validation Function Tests
  // ==========================================================================

  describe('Validation Functions', () => {
    test('validateConfig should work with valid configuration', () => {
      const validConfig: FastKitConfigData = {
        server: { port: 3000, host: 'localhost', environment: 'test' },
        database: { type: 'mongodb', url: 'mongodb://localhost:27017/testdb' },
        jwt: { secret: 'test-secret-key-minimum-32-characters-long', algorithm: 'HS256' },
      };

      const result = validateConfig(validConfig);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.config).toBeDefined();
    });

    test('validateServerConfig should validate server configuration', () => {
      const serverConfig: ServerConfig = {
        port: 3000,
        host: 'localhost',
        environment: 'development',
      };

      const result = validateServerConfig(serverConfig);
      expect(result.isValid).toBe(true);
      expect(result.config).toEqual(serverConfig);
    });

    test('validateDatabaseConfig should validate database configuration', () => {
      const databaseConfig: DatabaseConfig = {
        type: 'mongodb',
        url: 'mongodb://localhost:27017/testdb',
      };

      const result = validateDatabaseConfig(databaseConfig);
      expect(result.isValid).toBe(true);
      expect(result.config).toEqual(databaseConfig);
    });

    test('validateJWTConfig should validate JWT configuration', () => {
      const jwtConfig: JWTConfig = {
        secret: 'test-secret-key-minimum-32-characters-long',
        expiresIn: '24h',
        algorithm: 'HS256',
      };

      const result = validateJWTConfig(jwtConfig);
      expect(result.isValid).toBe(true);
      expect(result.config).toEqual(jwtConfig);
    });
  });

  // ==========================================================================
  // Integration Tests
  // ==========================================================================

  describe('Integration Tests', () => {
    test('should handle complete workflow from .env.test file', () => {
      // Create .env.test file
      testHelpers.createEnvFromObject(validEnvVars);

      // Load configuration
      const config = new FastKitConfig(TEST_ENV_FILE);
      const configData = config.getConfig();

      // Verify configuration
      expect(configData.server.port).toBe(3000);
      expect(configData.database.type).toBe('mongodb');
      expect(configData.jwt.secret).toBe('test-secret-key-minimum-32-characters-long');

      // Update configuration
      config.updateConfig({
        server: { ...configData.server, port: 4000 },
      });

      expect(config.getConfig().server.port).toBe(4000);
    });

    test('should work with production-like configuration', () => {
      const prodEnv = {
        PORT: '80',
        HOST: '0.0.0.0',
        NODE_ENV: 'production',
        DATABASE_TYPE: 'postgresql',
        DATABASE_HOST: 'prod-db.example.com',
        DATABASE_PORT: '5432',
        DATABASE_USERNAME: 'produser',
        DATABASE_PASSWORD: 'securepass123',
        DATABASE_NAME: 'prod_app',
        DATABASE_SSL: 'true',
        JWT_SECRET: 'super-secure-production-secret-key-32-chars-min',
        JWT_EXPIRES_IN: '15m',
        JWT_REFRESH_SECRET: 'refresh-secret-production-32-chars-minimum',
        JWT_REFRESH_EXPIRES_IN: '7d',
        JWT_ALGORITHM: 'HS512',
        JWT_ISSUER: 'prod.myapp.com',
        JWT_AUDIENCE: 'prod-users',
        CORS_ORIGIN: 'https://myapp.com',
        CORS_CREDENTIALS: 'true',
        SECURITY_HELMET: 'true',
        SECURITY_COMPRESSION: 'true',
        SECURITY_MORGAN: 'false',
        RATE_LIMIT_WINDOW_MS: '900000',
        RATE_LIMIT_MAX: '100',
      };

      testHelpers.createEnvFromObject(prodEnv);

      expect(() => {
        const config = new FastKitConfig(TEST_ENV_FILE);
        const configData = config.getConfig();

        expect(configData.server.port).toBe(80);
        expect(configData.server.environment).toBe('production');
        expect(configData.database.type).toBe('postgresql');
        expect(configData.database.ssl).toBe(true);
        expect(configData.jwt.algorithm).toBe('HS512');
        expect(configData.cors?.origin).toBe('https://myapp.com');
        expect(configData.security?.helmet).toBe(true);
      }).not.toThrow();
    });
  });

  // ==========================================================================
  // Error Handling Tests
  // ==========================================================================

  describe('Error Handling', () => {
    test('should provide meaningful validation errors', () => {
      const invalidEnv = {
        PORT: '-1',
        NODE_ENV: 'invalid',
        DATABASE_TYPE: 'invalid',
        JWT_SECRET: 'short',
      };
      testHelpers.createEnvFromObject(invalidEnv);

      expect(() => {
        new FastKitConfig(TEST_ENV_FILE);
      }).toThrow(/Invalid configuration/);
    });

    test('should handle missing .env file gracefully', () => {
      // Don't create any .env file, just set minimal env vars
      process.env.JWT_SECRET = 'test-secret-key-minimum-32-characters-long';

      expect(() => {
        new FastKitConfig('/nonexistent/.env.test');
      }).not.toThrow();
    });

    test('should handle malformed .env file', () => {
      const malformedContent = `
        PORT=3000
        INVALID LINE WITHOUT EQUALS
        =VALUE_WITHOUT_KEY
        NODE_ENV=test
        JWT_SECRET=test-secret-key-minimum-32-characters-long
      `;
      testHelpers.createTestEnvFile(malformedContent);

      expect(() => {
        new FastKitConfig(TEST_ENV_FILE);
      }).not.toThrow();
    });
  });

  // ==========================================================================
  // Performance Tests
  // ==========================================================================

  describe('Performance Tests', () => {
    test('should load configuration quickly', () => {
      testHelpers.setEnvVars(validEnvVars);

      const startTime = Date.now();
      for (let i = 0; i < 10; i++) {
        FastKitConfig.fromEnv();
      }
      const endTime = Date.now();

      // Should complete 10 config loads in under 100ms
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should validate configuration quickly', () => {
      testHelpers.setEnvVars(validEnvVars);

      const startTime = Date.now();
      for (let i = 0; i < 100; i++) {
        FastKitConfig.validateEnv();
      }
      const endTime = Date.now();

      // Should complete 100 validations in under 200ms
      expect(endTime - startTime).toBeLessThan(200);
    });
  });
});

// ============================================================================
// Utility Test Functions
// ============================================================================

/**
 * Test helper to create temporary .env.test files
 */
export function createTempEnvFile(envVars: Record<string, string>, filename?: string): string {
  const tempFile = filename || path.join(os.tmpdir(), `.env.test.${Date.now()}`);
  const content = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  fs.writeFileSync(tempFile, content);
  return tempFile;
}

/**
 * Test helper to cleanup temporary files
 */
export function cleanupTempFiles(pattern: RegExp = /\.env\.test\./): void {
  const tempDir = os.tmpdir();
  const files = fs.readdirSync(tempDir);
  files.forEach((file) => {
    if (pattern.test(file)) {
      const fullPath = path.join(tempDir, file);
      try {
        fs.unlinkSync(fullPath);
      } catch {
        // Ignore cleanup errors
      }
    }
  });
}

// Export test data for use in other test files
export { validEnvVars, testHelpers };

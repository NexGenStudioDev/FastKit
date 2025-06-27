/**
 * FastKit Configuration Module
 *
 * This module provides comprehensive configuration management for FastKit applications.
 * It automatically loads and validates configuration from environment variables.
 *
 * @author FastKit Team
 * @version 1.0.0
 */

import { FastKitConfig } from './FastKit.config';

// Main configuration classes
export * from './FastKit.config';

export * from './env.manager';

// Configuration interfaces and types
export type {
  FastKitConfigData,
  JWTConfig,
  CORSConfig,
  ServerConfig,
  SecurityConfig,
  EmailConfig,
  EnvironmentType,
  JWTAlgorithmType,
  HTTPMethodType,
  CORSOriginType,
  ValidationResult,
} from './config.types';

// Validation functions
export {
  validateConfig,
  validateServerConfig,
  validateJWTConfig,
  isFastKitConfig,
  isServerConfig,
  isJWTConfig,
} from './config.validation';


export const generateSampleEnv = (filePath?: string) => FastKitConfig.generateSampleEnv(filePath);




// Re-export common schemas for advanced usage
export {
  fastKitConfigSchema,
  serverConfigSchema,
  jwtConfigSchema,
  corsConfigSchema,
  securityConfigSchema,
} from './config.validation';

/**
 * Default export for convenience
 */
export default FastKitConfig;

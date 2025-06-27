import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
config({ path: path.join(process.cwd(), '.env') });

import { validateEnvData } from './config.validation';
import type { FastKitConfigData } from './config.types';
import { EnvConstants } from '../../constant/env.constant';

export class FastKitConfig {
  private config!: FastKitConfigData;
  private envFilePath: string;

  constructor(envPath?: string) {
    this.envFilePath = envPath || path.join(process.cwd(), '.env');
  }

  /**
   * Create a new FastKitConfig instance and validate current environment
   */
  public static validateEnv(): { isValid: boolean; errors: string[] } {
    try {
      const config = validateEnvData(EnvConstants);

      return {
        isValid: config.isValid,
        errors: config.errors,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }
  }

  private envValidate(): { isValid: boolean; errors: string[] } {
    try {
      const config = validateEnvData(EnvConstants);
      console.log('✅ Environment variables loaded and validated successfully', config);

      this.config = config.config!;
      return {
        isValid: config.isValid,
        errors: config.errors,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }
  }

  /**
   * Update configuration with new values
   */
  /**
   * Get current configuration
   */
  public getConfig(): FastKitConfigData {
    return { ...this.config };
  }

  /**
   * Update configuration with new values
   */
  public updateConfig(newConfig: Partial<FastKitConfigData>): void {
    this.config = { ...this.config, ...newConfig };
    this.envValidate();
  }

  /**
   * Create a new FastKitConfig instance from environment variables
   */
  public static fromEnv(envPath?: string): FastKitConfig {
    return new FastKitConfig(envPath);
  }

  /**
   * Generate a sample .env file with default values
   */
  public static generateSampleEnv(filePath?: string): void {
    const envPath = filePath || path.join(process.cwd(), '.env.example');

    const sampleContent = `# ===============================================================
# FastKit Environment Configuration
# This file contains sample environment variables for FastKit
# Copy this file to .env and modify the values as needed
# ===============================================================

# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development
ENVIRONMENT=development
# SERVER_TIMEOUT=30000
# SERVER_KEEP_ALIVE=true
# SERVER_BODY_LIMIT=100mb
# SERVER_TRUST_PROXY=false

# Database Configuration
DATABASE_TYPE=mongodb
DATABASE_URL=mongodb://localhost:27017/fastkit
# DATABASE_HOST=localhost
# DATABASE_PORT=27017
# DATABASE_USERNAME=your_username
# DATABASE_PASSWORD=your_password
# DATABASE_NAME=fastkit
# DATABASE_POOL_SIZE=10
# DATABASE_CONNECTION_TIMEOUT=30000
# DATABASE_SSL=false

# JWT Configuration (Required)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-chars
JWT_EXPIRES_IN=24h
JWT_ALGORITHM=HS256
# JWT_REFRESH_SECRET=your-refresh-secret-minimum-32-chars
# JWT_REFRESH_EXPIRES_IN=7d
# JWT_ISSUER=your-app
# JWT_AUDIENCE=your-users
# JWT_SUBJECT=auth

# CORS Configuration (Optional)
# CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
# CORS_METHODS=GET,POST,PUT,DELETE,PATCH
# CORS_ALLOWED_HEADERS=Content-Type,Authorization
# CORS_CREDENTIALS=true
# CORS_MAX_AGE=86400

# Security Configuration (Optional)
# RATE_LIMIT_WINDOW_MS=900000
# RATE_LIMIT_MAX=100
# SECURITY_HELMET=true
# SECURITY_COMPRESSION=true
# SECURITY_MORGAN=true
# SECURITY_CSRF=false

# Email Configuration (Optional)
# EMAIL_SERVICE=gmail
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_SECURE=false
# EMAIL_USERNAME=your-email@gmail.com
# EMAIL_PASSWORD=your-app-password
# EMAIL_FROM=noreply@yourapp.com

# Storage Configuration (Optional)
# STORAGE_PROVIDER=local
# STORAGE_BUCKET=your-bucket
# STORAGE_REGION=us-east-1
# STORAGE_ACCESS_KEY_ID=your-access-key
# STORAGE_SECRET_ACCESS_KEY=your-secret-key
# STORAGE_CDN_URL=https://cdn.yourapp.com

# Cache Configuration (Optional)
# CACHE_PROVIDER=memory
# CACHE_HOST=localhost
# CACHE_PORT=6379
# CACHE_PASSWORD=your-redis-password
# CACHE_TTL=3600
# CACHE_PREFIX=fastkit:

# Logging Configuration (Optional)
# LOG_LEVEL=info
# LOG_FORMAT=json
# LOG_FILE_PATH=./logs/app.log
# LOG_MAX_FILE_SIZE=10m
# LOG_MAX_FILES=5

# API Configuration (Optional)
# API_VERSION=1.0.0
# API_PREFIX=/api/v1
# API_DOCS_URL=https://docs.yourapp.com
# API_TIMEOUT=30000

# Monitoring Configuration (Optional)
# HEALTH_CHECK=true
# HEALTH_CHECK_PATH=/health
# METRICS=true
# METRICS_PATH=/metrics
# APM_ENABLED=false
# APM_SERVICE_NAME=fastkit-app
# APM_SERVER_URL=https://apm.yourapp.com
# APM_API_KEY=your-apm-key

# Custom Configuration (Optional)
# APP_NAME=FastKit App
# APP_VERSION=1.0.0
# CUSTOM_DEBUG=true
`;

    try {
      fs.writeFileSync(envPath, sampleContent, 'utf8');
      console.log(`✅ Sample .env file generated: ${envPath}`);
    } catch (error) {
      console.error('❌ Failed to generate sample .env file:', error);
      throw new Error(
        `Failed to generate sample .env file: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}

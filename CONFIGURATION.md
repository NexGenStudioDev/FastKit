# FastKit Configuration System

A comprehensive configuration management system for FastKit that allows you to create, manage, and write environment configurations to `.env` files.

> 📖 **Detailed Documentation**: See [FastKit.config.md](src/config/FastKit.config.md) for complete API reference and advanced usage examples.

## Features

- 🔧 **Type-safe Configuration**: Full TypeScript support with interfaces
- 📝 **Environment File Generation**: Automatically generate `.env` files from configuration objects
- 🔄 **Configuration Merging**: Merge new configurations with existing `.env` files
- 🌍 **Multi-Environment Support**: Separate configurations for development, production, and testing
- 🛡️ **Validation**: Built-in validation for configuration values
- 📋 **Sample Generation**: Generate sample configurations for quick setup
- 🔒 **Security**: Mask sensitive values in logs and exports

## Quick Start

### Basic Usage

```typescript
import { FastKitConfig, FastKitConfigData } from './config/FastKit.config';

// Create configuration
const config: FastKitConfigData = {
  server: {
    port: 3000,
    host: 'localhost',
    environment: 'development'
  },
  database: {
    type: 'mongodb',
    url: 'mongodb://localhost:27017/myapp'
  },
  jwt: {
    secret: 'your-secret-key',
    expiresIn: '24h'
  }
};

// Create FastKitConfig instance and write to .env
const fastKitConfig = new FastKitConfig(config);
await fastKitConfig.writeToEnv(true); // true = create backup
```

### Load from Environment

```typescript
import { EnvManager } from './config/env.manager';

// Load .env file
EnvManager.loadEnvFile(); // loads from .env in current directory

// Get environment configuration
const envConfig = EnvManager.getEnvironmentConfig();
console.log('Server port:', envConfig.server.port);
```

## Configuration Interfaces

### FastKitConfigData

The main configuration interface that defines all possible configuration options:

```typescript
interface FastKitConfigData {
  server: ServerConfig;      // Required: Server configuration
  database: DatabaseConfig; // Required: Database configuration  
  jwt: JWTConfig;           // Required: JWT configuration
  cors?: CORSConfig;        // Optional: CORS configuration
  security?: SecurityConfig; // Optional: Security settings
  email?: EmailConfig;      // Optional: Email configuration
  custom?: Record<string, any>; // Optional: Custom variables
}
```

### Server Configuration

```typescript
interface ServerConfig {
  port: number;                                    // Server port (required)
  host?: string;                                   // Server host (default: 'localhost')
  environment: 'development' | 'production' | 'test'; // Environment (required)
  nodeEnv?: string;                               // Additional NODE_ENV value
}
```

### Database Configuration

```typescript
interface DatabaseConfig {
  type: 'mongodb' | 'mysql' | 'postgresql' | 'sqlite'; // Database type (required)
  host?: string;                                       // Database host
  port?: number;                                       // Database port
  username?: string;                                   // Database username
  password?: string;                                   // Database password
  database?: string;                                   // Database name
  url?: string;                                        // Full connection URL (alternative to individual fields)
}
```

### JWT Configuration

```typescript
interface JWTConfig {
  secret: string;                                      // JWT secret (required)
  expiresIn?: string;                                 // Token expiration (default: '24h')
  refreshSecret?: string;                             // Refresh token secret
  refreshExpiresIn?: string;                          // Refresh token expiration
  algorithm?: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512'; // Algorithm
}
```

### CORS Configuration

```typescript
interface CORSConfig {
  origin?: string | string[] | boolean;              // Allowed origins
  methods?: string[];                                 // Allowed HTTP methods
  allowedHeaders?: string[];                          // Allowed headers
  credentials?: boolean;                              // Allow credentials
  maxAge?: number;                                    // Preflight cache duration
  preflightContinue?: boolean;                        // Pass preflight to next handler
  optionsSuccessStatus?: number;                      // Success status for OPTIONS
}
```

### Security Configuration

```typescript
interface SecurityConfig {
  rateLimitWindowMs?: number;                         // Rate limit window (ms)
  rateLimitMax?: number;                             // Max requests per window
  helmet?: boolean;                                   // Enable helmet middleware
  compression?: boolean;                              // Enable compression
  morgan?: boolean;                                   // Enable morgan logging
}
```

### Email Configuration

```typescript
interface EmailConfig {
  service?: string;                                   // Email service (e.g., 'gmail')
  host?: string;                                      // SMTP host
  port?: number;                                      // SMTP port
  secure?: boolean;                                   // Use TLS
  username?: string;                                  // SMTP username
  password?: string;                                  // SMTP password
  from?: string;                                      // Default from address
}
```

## Usage Examples

### 1. Create Development Configuration

```typescript
const devConfig: FastKitConfigData = {
  server: {
    port: 3000,
    host: 'localhost',
    environment: 'development'
  },
  database: {
    type: 'mongodb',
    url: 'mongodb://localhost:27017/myapp_dev'
  },
  jwt: {
    secret: 'dev-secret-key',
    expiresIn: '24h'
  },
  cors: {
    origin: true,
    credentials: true
  },
  security: {
    rateLimitMax: 1000,
    helmet: false,
    morgan: true
  }
};

const config = new FastKitConfig(devConfig, '.env.development');
await config.writeToEnv();
```

### 2. Create Production Configuration

```typescript
const prodConfig: FastKitConfigData = {
  server: {
    port: parseInt(process.env.PORT || '8080'),
    host: '0.0.0.0',
    environment: 'production'
  },
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL || 'postgresql://user:pass@host:5432/db'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-in-production',
    expiresIn: '1h',
    algorithm: 'HS256'
  },
  cors: {
    origin: ['https://yourdomain.com'],
    credentials: true
  },
  security: {
    rateLimitMax: 100,
    helmet: true,
    morgan: false
  }
};

const config = new FastKitConfig(prodConfig, '.env.production');
await config.writeToEnv();
```

### 3. Use Environment Manager

```typescript
import { EnvManager } from './config/env.manager';

// Load environment file
EnvManager.loadEnvFile('.env.development');

// Get typed values
const port = EnvManager.get('PORT', 3000, 'number');
const isProduction = EnvManager.get('NODE_ENV') === 'production';
const corsOrigins = EnvManager.get('CORS_ORIGIN', '', 'string').split(',');

// Validate required variables
const isValid = EnvManager.validateRequired(['PORT', 'JWT_SECRET', 'DATABASE_URL']);

// Get full configuration
const envConfig = EnvManager.getEnvironmentConfig();
```

### 4. Generate Sample Configuration

```typescript
// Generate a sample configuration
const sampleConfig = FastKitConfig.generateSampleConfig();
const sample = new FastKitConfig(sampleConfig, '.env.sample');
await sample.writeToEnv(false); // false = no backup
```

### 5. Update Existing Configuration

```typescript
const config = new FastKitConfig(myConfig);

// Update configuration
config.updateConfig({
  server: {
    ...config.getConfig().server,
    port: 5000
  },
  custom: {
    NEW_FEATURE: 'enabled',
    UPDATED_AT: new Date().toISOString()
  }
});

// Merge with existing .env file
await config.mergeWithExisting();
```

## Environment Variables Generated

The configuration system generates environment variables with the following naming conventions:

### Server Variables
- `PORT` - Server port
- `HOST` - Server host
- `NODE_ENV` - Node environment

### Database Variables
- `DATABASE_TYPE` - Database type
- `DATABASE_URL` - Full database connection URL
- `DATABASE_HOST` - Database host
- `DATABASE_PORT` - Database port
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password
- `DATABASE_NAME` - Database name

### JWT Variables
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - Token expiration time
- `JWT_REFRESH_SECRET` - Refresh token secret
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration
- `JWT_ALGORITHM` - JWT algorithm

### CORS Variables
- `CORS_ORIGIN` - Allowed origins (comma-separated)
- `CORS_METHODS` - Allowed methods (comma-separated)
- `CORS_ALLOWED_HEADERS` - Allowed headers (comma-separated)
- `CORS_CREDENTIALS` - Allow credentials (boolean)
- `CORS_MAX_AGE` - Preflight cache duration

### Security Variables
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `RATE_LIMIT_MAX` - Maximum requests per window
- `SECURITY_HELMET` - Enable helmet middleware
- `SECURITY_COMPRESSION` - Enable compression
- `SECURITY_MORGAN` - Enable morgan logging

### Email Variables
- `EMAIL_SERVICE` - Email service provider
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_SECURE` - Use secure connection
- `EMAIL_USERNAME` - SMTP username
- `EMAIL_PASSWORD` - SMTP password
- `EMAIL_FROM` - Default from address

## Best Practices

### 1. Environment-Specific Files

Create separate configuration files for different environments:

```bash
.env                 # Default/shared configuration
.env.development     # Development-specific
.env.production      # Production-specific
.env.test           # Test-specific
.env.local          # Local overrides (git-ignored)
```

### 2. Security

- Never commit production secrets to version control
- Use different JWT secrets for each environment
- Rotate secrets regularly
- Use environment-specific database credentials

### 3. Validation

Always validate your configuration:

```typescript
// Validate required environment variables
const requiredVars = ['PORT', 'JWT_SECRET', 'DATABASE_URL'];
if (!EnvManager.validateRequired(requiredVars)) {
  process.exit(1);
}
```

### 4. Type Safety

Use the environment manager for type-safe access:

```typescript
// Type-safe environment access
const config = EnvManager.getEnvironmentConfig();
const port: number = config.server.port; // Always a number
const isDev: boolean = config.isDevelopment; // Always a boolean
```

## CLI Usage (Future Enhancement)

```bash
# Generate sample configuration
npx fastkit config:sample

# Generate environment-specific configuration
npx fastkit config:env --environment=production

# Validate current configuration
npx fastkit config:validate

# Export configuration
npx fastkit config:export --file=config.json
```

## Integration with FastKit

The configuration system integrates seamlessly with the main FastKit class:

```typescript
import { FastKit } from './FastKit';
import { EnvManager } from './config/env.manager';

// Load environment
EnvManager.loadEnvFile();

// Get configuration
const config = EnvManager.getEnvironmentConfig();

// Initialize FastKit with configuration
const app = new FastKit({
  port: config.server.port,
  cors: config.cors,
  security: config.security
});
```

## Error Handling

The configuration system provides detailed error messages for common issues:

- Missing required configuration fields
- Invalid port numbers
- Invalid boolean values
- JSON parsing errors
- File system errors

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure write permissions to the target directory
2. **Invalid Configuration**: Check that all required fields are provided
3. **Type Errors**: Use the correct type when calling `EnvManager.get()`
4. **File Not Found**: Verify the .env file path is correct

### Debug Mode

Enable debug logging:

```typescript
process.env.DEBUG = 'fastkit:config';
```

This will provide detailed logging of configuration loading and processing.

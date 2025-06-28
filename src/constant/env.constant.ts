import { z } from 'zod';
import { config } from 'dotenv';
import path from 'path';

// Load env file
config({ path: path.join(process.cwd(), '.env.fastkit') });

// Define zod schema for your env variables
const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  HOST: z.string().default('localhost'),
  NODE_ENV: z.enum(['development', 'production', 'test', 'staging']).default('development'),
  ENVIRONMENT: z.enum(['development', 'production', 'test', 'staging']).default('development'),
  SERVER_TIMEOUT: z.string().default('30000').transform(Number),
  SERVER_KEEP_ALIVE: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  SERVER_BODY_LIMIT: z.string().default('100mb'),
  SERVER_TRUST_PROXY: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),

  DATABASE_TYPE: z.enum(['mongodb', 'mysql', 'postgresql', 'sqlite', 'redis']).default('mongodb'),
  DATABASE_URL: z.string().default('mongodb://localhost:27017/fastkit'),
  DATABASE_HOST: z.string().optional(),
  DATABASE_PORT: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  DATABASE_USERNAME: z.string().optional(),
  DATABASE_PASSWORD: z.string().optional(),
  DATABASE_NAME: z.string().optional(),
  DATABASE_SSL: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  DATABASE_POOL_SIZE: z.string().default('10').transform(Number),

  JWT_SECRET: z.string().default('your-super-secret-jwt-key-change-this-in-production'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  JWT_ALGORITHM: z
    .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'])
    .default('HS256'),

  CORS_ORIGIN: z
    .union([
      z.literal('true').transform(() => true),
      z.literal('false').transform(() => false),
      z.string(),
    ])
    .optional(),
  CORS_METHODS: z.string().optional(),
  CORS_ALLOWED_HEADERS: z.string().optional(),
  CORS_CREDENTIALS: z
    .string()
    .optional()
    .transform((val) => val === 'true'),

  RATE_LIMIT_WINDOW_MS: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  RATE_LIMIT_MAX: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  SECURITY_HELMET: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  SECURITY_COMPRESSION: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  SECURITY_MORGAN: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),

  EMAIL_SERVICE: z
    .enum(['gmail', 'yahoo', 'outlook', 'sendgrid', 'mailgun', 'ses', 'custom'])
    .optional(),
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  EMAIL_SECURE: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  EMAIL_USERNAME: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  APP_NAME: z.string().optional(),
  API_VERSION: z.string().optional(),
  MAX_FILE_SIZE: z.string().optional(),
});

// Validate and parse process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

// Export validated and parsed env constants
export const EnvConstants = Object.freeze(parsedEnv.data);

console.log('✅ Environment Constants Loaded:', EnvConstants);

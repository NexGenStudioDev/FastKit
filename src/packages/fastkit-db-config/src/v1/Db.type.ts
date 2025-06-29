/**
 * Supported database types
 */
export type DatabaseType = 'mongodb' | 'mysql' | 'postgresql' | 'sqlite' | 'redis';

/**
 * Database configuration interface
 */
export interface DatabaseConfig {
  type: DatabaseType;
  host?: string;
  port?: number;
  username?: string;
  password?: string;

  databaseName?: string;
  /** Full database connection URL (alternative to individual fields) */
  url?: string;
  /** Connection pool size */
  poolSize?: number;
  /** Connection timeout in milliseconds */
  connectionTimeout?: number;
  /** Enable SSL/TLS connection */
  ssl?: boolean;
  /** Additional database options */
  options?: Record<string, unknown>;
}

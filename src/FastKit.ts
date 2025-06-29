// ============= FASTKIT MAIN ENTRY POINT =============
// Import and re-export all modules for unified access

// Auth Module Exports
export { 
  AuthConstant, 
  AuthController, 
  AuthService 
} from './packages/fastkit-auth/src/index';

// Config Module Exports  
export { 
  FastKit, 
  setup_FastKit_EnvFiles,
  envConfig_Type,
  Config_Type 
} from './packages/fastkit-config/src/index';

// Database Config Module Exports
export { 
  DatabaseConfig, 
  DatabaseType

} from './packages/fastkit-db-config/src/v1/index';

// Namespace Exports for modular access
export * as auth from './packages/fastkit-auth/src/index';
export * as config from './packages/fastkit-config/src/index';
export * as db from './packages/fastkit-db-config/src/v1/index';

// Wildcard exports for convenience
export * from './packages/fastkit-auth/src/index';
export * from './packages/fastkit-config/src/index';
export * from './packages/fastkit-db-config/src/v1/index';
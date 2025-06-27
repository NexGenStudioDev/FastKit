/**
 * FastKit - Type-Safe Configuration System
 * 
 * This example demonstrates how to use FastKit's configuration system
 * that automatically reads and validates environment variables.
 */

import { FastKitConfig } from './config/FastKit.config';
import { EnvManager } from './config/env.manager';
import { EnvConstants } from './constant/env.constant';



// Create Env directory if it doesn't exist and load .env files
console.log('🔧 FastKit Type-Safe Configuration System\n');
EnvManager.loadEnvFile();


// Validate and load configuration from environment variables
const configResult = FastKitConfig.validateEnv();

if (configResult.isValid) {
  console.log('✅ Configuration loaded successfully!');
  
  
}

console.log(EnvConstants)
// Generate sample .env file if needed
if (!configResult.isValid) {
  console.log('\n📝 Generating sample .env file...');
  try {
   
    console.log('✅ Sample .env.example file created. Copy it to .env and modify as needed.');
  } catch (error) {
    console.error('❌ Failed to generate sample .env file:', error);
  }
}



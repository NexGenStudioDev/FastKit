import * as fs from 'fs';
import * as path from 'path';
import { setupEnvFiles } from './config.env.create';

/**
 * Environment variable utilities for FastKit
 * Provides methods to load, validate, and manage environment variables
 */
export class EnvManager {
  private static loadedVars: Map<string, string> = new Map();

  public static loadEnvFile(): void {
    const envPath = path.join(process.cwd(), 'Environment');

 try {
       if (!fs.existsSync(envPath) || !fs.statSync(envPath).isDirectory()) {
      fs.mkdirSync(envPath, {
        recursive: true,
        mode: 0o755, // Permissions: rwxr-xr-x
      });
    }

    return setupEnvFiles();

 } catch (error) {
    console.error('❌ Failed to create Environment directory:', error);
      throw new Error(`Failed to create Environment directory: ${error instanceof Error ? error.message : error}`);
    }

  }


}

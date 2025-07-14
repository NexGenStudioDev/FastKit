// jest.config.cjs
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm', // Use ESM preset for ts-jest
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Fix import extensions for ESM
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Ensure TypeScript files are resolved
  collectCoverage: true, // Enable test coverage collection
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'], // Include only relevant files for coverage
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['text', 'lcov'], // Coverage report formats
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.spec.ts'], // Explicit test file patterns
};

export default config;

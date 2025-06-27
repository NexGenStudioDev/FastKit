// jest.config.cjs
export default {
  preset: 'ts-jest/presets/default-esm', // use ESM preset for ts-jest
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // fix import extensions
  },
};
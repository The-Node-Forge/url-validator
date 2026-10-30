module.exports = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Use Node.js environment for tests
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  testMatch: ['**/tests/**/*.test.ts'], // Match test files
  verbose: true, // Show detailed test results
  collectCoverageFrom: ['src/**/*.ts'], // Report on every source file, tested or not
  coverageThreshold: {
    global: { statements: 90, branches: 75, functions: 100, lines: 90 },
  }, // Fail CI if coverage regresses
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

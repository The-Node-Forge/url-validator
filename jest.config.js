module.exports = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Use Node.js environment for tests
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  testMatch: ['**/tests/**/*.test.ts'], // Match test files
  verbose: true, // Show detailed test results
};

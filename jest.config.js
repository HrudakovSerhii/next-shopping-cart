module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/globals.css',
    '!src/types.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 40,
      functions: 50,
      lines: 60,
    },
  },
  moduleDirectories: ['node_modules', 'src', '<rootDir>/testing'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
};

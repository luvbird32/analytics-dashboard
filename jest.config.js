
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/test/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 10000,
  // Separate test suites for different types of testing
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: [
        '<rootDir>/src/test/visual/',
        '<rootDir>/src/test/performance/',
        '<rootDir>/src/test/accessibility/',
        '<rootDir>/src/test/integration/'
      ]
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/src/test/integration/**/*.{test,spec}.{js,jsx,ts,tsx}']
    },
    {
      displayName: 'visual',
      testMatch: ['<rootDir>/src/test/visual/**/*.{test,spec}.{js,jsx,ts,tsx}']
    },
    {
      displayName: 'performance',
      testMatch: ['<rootDir>/src/test/performance/**/*.{test,spec}.{js,jsx,ts,tsx}']
    },
    {
      displayName: 'accessibility',
      testMatch: ['<rootDir>/src/test/accessibility/**/*.{test,spec}.{js,jsx,ts,tsx}']
    }
  ]
};

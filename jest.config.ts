import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    // Where tests live
    testMatch: ['**/tests/**/*.test.ts'],

    // Ignore build output
    modulePathIgnorePatterns: ['dist'],

    // Coverage
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/server.ts',   // entry point
        '!src/**/*.d.ts'
    ],
    coverageDirectory: 'coverage',

    // Clear mocks between tests
    clearMocks: true,

    // Better MongoDB memory handling
    testTimeout: 30000
};

export default config;

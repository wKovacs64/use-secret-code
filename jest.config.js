module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test'],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  testEnvironment: 'jsdom',
};

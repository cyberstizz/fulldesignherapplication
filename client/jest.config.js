module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    testEnvironmentOptions: {
      url: "http://localhost"
    },
    verbose: true
  };
  
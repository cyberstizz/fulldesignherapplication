module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|heic|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Add this line
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testEnvironmentOptions: {
    url: "http://localhost"
  },
  verbose: true
};

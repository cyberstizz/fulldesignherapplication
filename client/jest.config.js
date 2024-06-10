module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    verbose: true,
    testURL: "http://localhost/",
  };
  

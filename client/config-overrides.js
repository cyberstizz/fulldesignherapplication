const path = require('path');

module.exports = {
  webpack: {
    configure: (config) => {
      // Add resolve.fallback for crypto, path, os, stream, and buffer
      config.resolve.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/")
      };
      return config;
    },
  },
};

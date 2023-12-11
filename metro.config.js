// metro.config.js
const { mergeConfig } = require('metro-config');

const configA = {
  /* general options */

  resolver: {
    /* resolver options */
  },
  transformer: {
    /* transformer options */
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  }
};

const configB = {
  /* general options */

  resolver: {
    /* resolver options */
  },
  transformer: {
    /* transformer options */
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  }
};

module.exports = mergeConfig(configA, configB);
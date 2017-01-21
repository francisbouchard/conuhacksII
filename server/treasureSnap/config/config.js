'use strict';

const config = require('./config.json');
const env = process.env.NODE_ENV || 'local';

module.exports = config[env];

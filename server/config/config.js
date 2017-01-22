'use strict';

const config = require('./config.json');
const env =  'production';

module.exports = config[env];

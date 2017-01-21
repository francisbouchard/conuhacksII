'use strict';

const mongoose = require('mongoose');

const Base64Schema = new mongoose.Schema({
    basestring: String
});

module.exports = mongoose.model('base', Base64Schema)


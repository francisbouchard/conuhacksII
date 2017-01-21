'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    originalname: String,
    filename: String,
    contentType: String,
    size: String
});

module.exports = mongoose.model('Image', ImageSchema);
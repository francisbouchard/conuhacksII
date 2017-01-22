'use strict';

const express = require('express');
const router = express.Router();
const challenges = require('../config/challenges.json');

router.route('/random')
    .get(function(req, res, next) {
        const challenge = getRandomWord(challenges.words)
        return res.json({challenge})
    });

function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

module.exports = router;

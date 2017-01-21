'use strict';

const router = require('express').Router();
const ImageModel = require('../models/image.model');
const multer = require('multer');
const upload = multer({dest: __dirname + '/../public/images'});

router.route('/')
    .get(function(req, res, next) {
        return res.render('index', {});
    })
    .post(upload.single('image'), function(req, res, next){

        const image = new ImageModel();
        image.filename = req.file.filename;
        image.originalname = req.file.originalname;
        image.contentType = req.file.mimetype;
        image.contentType = req.file.mimetype;

        return image.save()
            .then(img => {
                return res.send(img.filename)
            })
            .catch(next);
    });

module.exports = router;
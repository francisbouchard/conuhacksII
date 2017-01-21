'use strict';

const router = require('express').Router();
const ImageModel = require('../models/image.model');
const multer = require('multer');
const clarifai = require("../../clarifai/clarifai");
const config = require("../config/config");


const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
    },
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../public/images');
    }
});

const upload = multer({
    dest: __dirname + '/../public/images',
    storage: storage
});

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
                return clarifai(`http://usapears.org/wp-content/uploads/2009/11/concorde-pear.jpg`)
                    .then(result => {
                        console.log(result);
                        return res.send(result);
                    })
            })
            .catch(next);
    });

module.exports = router;
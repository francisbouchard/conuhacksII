'use strict';

const router = require('express').Router();

const Base64Model = require('../models/base64.model');
const clarifai = require("../clarifai/clarifai");

router.route('/')
    .post(function(req, res, next) {
        const basestring = req.body.image;

        return Base64Model.create({basestring})
            .then(function(doc) {
                if(doc) {
                    return res.send(doc);
                } else {
                    return res.sendStatus(400)
                }
            })
    });

router.route('/game')
    .post(function(req, res, next) {

        const base64 = req.body.image;
        const word = req.body.challenge;

        return clarifai(base64)
            .then(result => {
                const concepts = result.outputs[0].data.concepts.map(c => ({name: c.name, value: c.value}));
                const conceptMatch = concepts.find(c => c.name == word);
                const correctness = conceptMatch ? conceptMatch.value : 0;
                
                let points = Math.floor(correctness * 100) - 80;
                points = (points < 0) ? '0/20' : `${points}/20`;
                

                let message;
                if(points) {
                    message = `Congratulations, you recieve: ${points} points`;
                } else {
                    message = `Sorry you failed and got no points`;
                }

                return res.send({points: points, message: message});

            })
            .catch(next);
    });

module.exports = router;


/*
    .post(upload.single('image'), function(req, res, next){

        const imageFile = decode(req.body.image);
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





/*
 const {encode, decode} = require('node-base64-image');


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
 */


const fs = require('fs');

var Clarifai = require('clarifai');
// instantiate a new Clarifai app passing in your clientId and clientSecret
      var app = new Clarifai.App(
        '_pbJ5U6J4AsESCs6RAFbk6pBH76sYHbk3ZXl_JJs',
        '4tBoy0G7XXtITFqHaxiETb-O-XDLicVbaNo5Bz0r'
      );

module.exports = function(url) {
    return app.models.predict(Clarifai.GENERAL_MODEL, url)
        .then(result => {
            return result
        })
        .catch(err => {
            console.log(err);
        })
}

const fs = require('fs');

var Clarifai = require('clarifai');


// instantiate a new Clarifai app passing in your clientId and clientSecret
      var app = new Clarifai.App(
        '_pbJ5U6J4AsESCs6RAFbk6pBH76sYHbk3ZXl_JJs',
        '4tBoy0G7XXtITFqHaxiETb-O-XDLicVbaNo5Bz0r'
      );

function clarifi(base64) {
    return app.models.predict(Clarifai.GENERAL_MODEL, {base64: base64});
}

module.exports = clarifi;

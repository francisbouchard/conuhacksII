
const fs = require('fs');

var Clarifai = require('clarifai');
// instantiate a new Clarifai app passing in your clientId and clientSecret
      var app = new Clarifai.App(
        '_pbJ5U6J4AsESCs6RAFbk6pBH76sYHbk3ZXl_JJs',
        '4tBoy0G7XXtITFqHaxiETb-O-XDLicVbaNo5Bz0r'
      );


app.models.predict(Clarifai.COLOR_MODEL, "https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg")
    .then(function(response) {
            console.log(JSON.stringify(response))
            // do something with response
        },
        function(err) {
        console.log(err)
      // there was an error
    }
  );
'use strict';

const needle = require('needle');
const fs = require('fs');
const fileType = require('file-type');

const image = fs.readFileSync(__dirname + '/concorde-pear.jpg');

const ft = fileType(image);
const data = {
    image: {
        buffer: image,
        filename: 'test',
        content_type: ft.mime
    }
};
const header = {
    'Content-Type': 'multipart/form-data',
    'Content-Length': image.length,
    'X-Requested-With': 'XMLHttpRequest',
    'multipart': true
};

return new Promise((resolve, reject) => {
        needle.post('http://localhost:3000/images', data, header, function (err, response, body) {
        if (err) {
            console.log('Error when uploading file');
            reject(err);
        } else {
            resolve(body);
        }
    });
})

console.log();
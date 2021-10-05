let randomstring = require("randomstring");

randomstring.generate({
    length: 20,
    charset: 'custom'
});

console.log(randomstring.generate())

// Uses Npm Package: https://www.npmjs.com/package/randomstring
// Able To Change The Length Of The Password To Any Length You Want
// Generates Password In Command Line
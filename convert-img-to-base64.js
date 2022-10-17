// import fileSystem from nodejs
const fs = require('fs')

// function to encode file data to base64 encoded string
const base64Encodes = (file) => {
    // read binary data
    const bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// Usage || write img file in this project directory
const base64strings = base64Encodes('exampleImage.png')

// run node convert-img-to-base64.js in the terminal

// Log base64 string
console.log(base64strings)

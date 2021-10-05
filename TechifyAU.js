const crypto = require("crypto");
const id = crypto.randomBytes(20).toString('hex');
console.log('Password:')
console.log(id)

// Uses Crypto
// Able To Change The Length To Whatever You Want
// Generates Password In Command Line
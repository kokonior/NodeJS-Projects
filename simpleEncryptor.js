const key = 'yourkeyhereplease';
const encryptor = require('simple-encryptor')(key);


const realString = "iloveu";

const encrypted = encryptor.encrypt(realString);
console.log("encrypted message", encrypted);

const decrypted = encryptor.decrypt(encrypted);
console.log("decrypted message", decrypted);

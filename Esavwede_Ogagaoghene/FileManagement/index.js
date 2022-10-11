const fs = require('fs') 

const file = fs.readFileSync('hello.txt','utf-8')

console.log(file)
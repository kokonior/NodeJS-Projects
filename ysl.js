const brainly = require('brainly-scraper');
const readlineSync = require('readline-sync')

const q = readlineSync.question("Masukkan pertanyaanmu?: ")
=======
const q = readlineSync.question("Masukkan keyword: ")


brainly(q).then(res => {
    console.log(res);
});

import axios from 'axios';
const fs = require('fs');

async function processUrlImageToBase64(url) {
    return await axios(url, { responseType: 'arraybuffer' }).then(response => Buffer.from(response.data, 'binary').toString('base64'));
}

const imgUrl = 'https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/07/13/gambar-ilustrasi-bisa-memperjela-20210713123218.jpg'

console.log(processUrlImageToBase64(imgUrl));
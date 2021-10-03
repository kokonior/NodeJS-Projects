const fetch = require('node-fetch');
const cheerio = require('cheerio');

const get = () => new Promise((resolve, reject) => {
    fetch('https://revuto.com/api/v1/invitation/muhab3ea7c', {
        headers: {
            'authority': 'revuto.com',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'accept': 'application/json, text/plain, */*',
            'sec-ch-ua-mobile': '?1',
            'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://revuto.com/invite/muhab3ea7c',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': '__cfduid=ddc3169ea6ed3f3a4c7aeb841abed85521620313025; _ga=GA1.2.2116285755.1620313027; _gid=GA1.2.1474259655.1620313027; _gat_UA-179206244-1=1'
        }
    })
    .then(res => res.text())
    .then(res => {
        const $ = cheerio.load(res);
        const data = 
        resolve(res)
    })
    .catch(err => reject(err))
});

(async () => {
    const getGet = await get();
    console.log(getGet)

})();

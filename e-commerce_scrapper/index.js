const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getProduct = () => new Promise((resolve,reject) => {
    fetch('https://basoaciakang.co.id/', {
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36'
        }
}) //pake promise


    .then (res => res.text())
    .then(result => {
        const $ = cheerio.load(result);
        const menu = $('h4.title').text();
        const desc = $('div.desc').text();
        const topping = $('h4.title').text();
        resolve("\t Berikut adalah Menu List : \n" + "\t\n\t" + menu + "\t\n\t" + desc + "\t\n\t" )
    })
    .catch(err => reject(err))

});
    
    (async () => {
        const detailPrice = await getProduct()
        console.log(detailPrice)
        
    })();

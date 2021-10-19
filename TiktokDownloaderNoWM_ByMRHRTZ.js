/*
* Tiktok Downloader No Watermark
* Author : MRHRTZ
*
* Installation :
* $ npm install axios cheerio querystring
*
* Then run it using node :
* $ TiktokDownloaderNoWM_ByMRHRTZ.js
*/


const { default: Axios } = require('axios')
const cheerio = require('cheerio')
const qs = require('querystring')

function tiktokdownload(url) {
    return new Promise((resolve, reject) => {
        Axios.get('https://ttdownloader.com/')
        .then((data) => {
            const $ = cheerio.load(data.data)
            const cookie = data.headers['set-cookie'].join('')
            const dataPost = {
                url: url,
                format: '', 
                token: $('#token').attr('value')
            }
            // return console.log(cookie);
            Axios({
                method: 'POST',
                url: 'https://ttdownloader.com/req/',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    origin: 'https://ttdownloader.com',
                    referer: 'https://ttdownloader.com/',
                    cookie: cookie,
                },
                data: qs.stringify(dataPost)
            }).then(({ data }) => {
                const $ = cheerio.load(data)
                const result = {
                    nowm: $('#results-list > div:nth-child(2) > div.download > a')?.attr('href'),
                    wm: $('#results-list > div:nth-child(3) > div.download > a')?.attr('href'),
                    audio: $('#results-list > div:nth-child(4) > div.download > a').attr('href')
                }
                resolve(result);
            })
            .catch(e => {
                reject({ status: false, message: 'error fetch data', e: e.message })
            })
        })
        .catch(e => {
            reject({ status: false, message: 'error fetch data', e: e.message })
        })
    })
}

// Contoh pemakaian

tiktokdownload('https://www.tiktok.com/@bacotskaleh/video/6991352661119388955')
.then(console.log)
.catch(console.log)

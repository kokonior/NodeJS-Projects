/* us-proxy.org scraper */

const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const UsProxy = ({ saveTo = `us-proxy-${new Date().getTime()}.txt`} = {}) => {
    return new Promise(async(resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'googlebot'
            }
        }
        var url = 'https://us-proxy.org/'
        try {
            var { data: html } = await axios(url)
            $ = cheerio.load(html)
            var proxy = $('textarea.form-control').text()
            proxy = proxy.split('\n').splice(3).join('\n')
            if (saveTo) {
                fs.writeFileSync(saveTo, proxy)
                resolve({
                    success: true,
                    saveTo
                })
            }
        } catch ({ status }) {
            reject({
                message: `Error with status code ${status}`
            })
        }
    })
}

// For testing
UsProxy().then(data => console.log(data)).catch(e => console.log(e))

module.exports = UsProxy

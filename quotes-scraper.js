const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');

const baseUrl = 'http://quotes.toscrape.com/';
const loginUrl = 'login';

(async () => {
  let html = await requestPromise({
    url: baseUrl + loginUrl,
    method: 'GET',
    gzip: true,
    resolveWithFullResponse: true,
  });

  let cookie = html.headers['set-cookie'].map(value => value.split(';')[0]).join(' ');

  console.log('cookie', cookie);

  let $ = cheerio.load(html.body);

  let csrfToken = $('input[name="csrf_token"]').val();
  
  try {
    let loginRequest = await requestPromise({
      url: baseUrl + loginUrl,
      method: 'POST',
      gzip: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'quotes.toscrape.com',
        'Origin': 'http://quotes.toscrape.com',
        'Referer': 'http://quotes.toscrape.com/login',
        'Upgrade-Insecure-Requests': '1',
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
      },  
      form: {
        'csrf_token': csrfToken,
        'username': 'admin',
        'password': 'admin',
      },
      resolveWithFullResponse: true,
    });
  
  } catch (err) {
    cookie = err.response.headers['set-cookie'].map(value => value.split(';')[0]).join(' ');
  }
})();
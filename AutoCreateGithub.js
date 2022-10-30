const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const randomUseragent = require('random-useragent');


var uname = readlineSync.question('[+] Masukan Username :');
var pw = readlineSync.question('[+] Masukan Password :');
var mail = readlineSync.question('[+] Masukan Email : ')
const $options = {
    waitUntil: 'networkidle2'
	};


(async () => {
    var usgent = randomUseragent.getRandom(function (ua) {
        return ua.osName === 'Windows';
	});

  var browser = await puppeteer.launch ({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://github.com/join', $options);

  const username = await page.type('#user_login',uname);
  const email  = await page.type('#user_email',mail);
  const password = await page.type('#user_password',pw);
  await page.select('select#all_emails');
  await page.select('#signup_button');

  try {
    await page.waitForNavigation($options);
    console.log('Berhasil Membuat Akun');
    await browser.close();
  } catch (error) {
    console.log('Gagal Membuat Akun');
    await browser.close();
  }
})();

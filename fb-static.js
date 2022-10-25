const puppeteer = require('puppeteer-extra');   
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const chromePaths = require('chrome-paths');
const cheerio = require('cheerio');
const sleep = ms => new Promise(res => setTimeout(res, ms));

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "no-sandbox",
            "--disable-notifications"
        ]
    });

    let allPage = await browser.pages();
    const page = await allPage[0];
    await page.goto('https://www.facebook.com/login/device-based/regular/login/', {
        waitUntil: 'networkidle2',
    });

    await page.waitForSelector('#email');
    await page.focus('#email');
    await page.keyboard.type('MASUKAN EMAIL FACEBOOK DISINI');
  
    await page.waitForSelector('#pass');
    await page.focus('#pass');
    await page.keyboard.type('MASUKAN PASSWORD FACEBOOK DISINI');

    const contentHtml = await page.content();
    const $ = cheerio.load(contentHtml);
    
    const userinfo = $('span.x1lliihq').text();
    const result = $('#loginbutton').attr('id')
    console.log("Berhasil Login Dengan username " + userinfo)

    await page.waitForSelector(`#${result}`);
    await page.evaluate((result) => document.querySelector(`#${result}`).click(), result);
    await sleep(10000);

    if (page.url() == 'https://www.facebook.com/') {
        await page.goto('MASUKAN POSTINGAN DISINI', {
            waitUntil: 'networkidle2',
        })
        console.log("Berhasil Login....")
        await sleep(3000,(console.log('Mencoba Comment...\n')));
        const comment = await allPage[0] 
        
        await comment.waitForSelector('div > .x1ed109x > .xh8yej3 > .x78zum5 > .xi81zsa')
        await comment.click('div > .x1ed109x > .xh8yej3 > .x78zum5 > .xi81zsa')
        await comment.click('form.x1ed109x');

        await sleep(3000,(console.log("Memasukan Comment...\n")));
        await comment.keyboard.type('Test Auto Comment Bot');
        
        
        await page.keyboard.press('Enter');
        await sleep(3000,(console.log("Berhasil Comment...")));
    } else {
        console.log('gagal load halaman nih...')
    } 
    })();

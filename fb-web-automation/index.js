// import chalk from 'chalk';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const chromePaths = require('chrome-paths');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")();
const fs = require('fs')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const sleep = ms => new Promise(res => setTimeout(res, ms));
const log = console.log;
var ascii = fs.readFileSync('ascii.txt',{encoding: 'utf-8'});
console.log(ascii + "\n");

var readlineSync = require('readline-sync');
var userinfo = readlineSync.question('Masukan Email/No-Telp\t       : ','\n');
var password = readlineSync.question('Masukan Password akun\t       : ', { hideEchoBack: true });
var url = readlineSync.question('Masukan URL yang ingin di-comment  : ');
var url2 = url; 
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "no-sandbox",
            "--disable-notifications"
        ]
    });
    await sleep(1000,console.log('\n'));
    await sleep (2000,console.log('Mencoba login dengan email : ' + userinfo + '...'));
    let allPage = await browser.pages();
    const page = await allPage[0];
    await page.goto('https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&amp;next=https%3A%2F%2Fwww.facebook.com%2Fafdi.pratama.3154', {
        waitUntil: 'networkidle2',
    });

    await page.waitForSelector('#email');
    await page.focus('#email');
    await page.keyboard.type(userinfo);
    await sleep (2000,console.log('Berhasil Memasukan Username...'));

    await page.waitForSelector('#pass');
    await page.focus('#pass');
    await page.keyboard.type(password);
    await sleep (2000,console.log('Berhasil Memasukan Password...'));

    const contentHtml = await page.content();
    const $ = cheerio.load(contentHtml);

    const login = $('#loginbutton').attr('id')
    await page.waitForSelector(`#${login}`);
    await page.evaluate((login) => document.querySelector(`#${login}`).click(), login);
    await sleep(8000);

    if (page.url() == 'https://www.facebook.com/') {
        await sleep(2000);
        await page.goto(url,{
            waitUntil: 'networkidle2',
        })
    } else {
        console.log('Gagal Menuju Halaman postingan...,CTRL+X untuk mengulangi ');
    }
    if (page.url() == url) {
        await sleep(1000,(console.log('Berhasil ke halaman postingan yang dituju...')));
        const inputcomment = readlineSync.question('Masukan Komentar : ') 
        const comment = await allPage[0];

        await comment.waitForSelector('div > .x1ed109x > .xh8yej3 > .x78zum5 > .xi81zsa')
        await comment.click('div > .x1ed109x > .xh8yej3 > .x78zum5 > .xi81zsa')
        await comment.click('form.x1ed109x');

        await comment.waitForSelector('.x78zum5 > .xi81zsa > .x1n2onr6 > .xzsf02u > .x1mh8g0r')
        await comment.click('.x78zum5 > .xi81zsa > .x1n2onr6 > .xzsf02u > .x1mh8g0r')
        

        await sleep(3000,console.log('Memasukan Comment...'));
        await comment.keyboard.type(inputcomment);
        await comment.keyboard.press('Enter');
        await sleep(2000,console.log('Berhasil Comment Dengan Komentar ' + inputcomment));
        if (page.url() == url2 ) {
            await sleep(1000,console.log('Ingin Coba lagi ? (y/n) '));
        }
    } else {
        await sleep(1000,console.log('Gagal Menuju Halaman postingan...,CTRL+X untuk mengulangi '));
    }
    
    // const comment = await allPage[0];


})();


const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');
const fs = require('fs');
const readlineSync = require('readline-sync');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


var login = 'http://elearning.bsi.ac.id/login';
var scollarship = 'http://elearning.bsi.ac.id/sch';
var profile = 'http://elearning.bsi.ac.id/user/profile';
var dashboard = 'http://elearning.bsi.ac.id/user/dashboard';
var logout = 'http://elearning.bsi.ac.id/logout';

var mhs = [{"nim" : "MASUKAN NIM", "password" : "PASSWORD"},
          {"nim" : "MASUKAN NIM", "password" : "PASSWORD"},];


// var NIM = readlineSync.question('Masukan NIM\t: ')
// var password = readlineSync.question('Masukan Password: ',{ hideEchoBack: true}); 

const sekarang = Date.now();
const today = new Date(sekarang);
const sleep = ms => new Promise (res => setTimeout(res, ms));

var ascii = fs.readFileSync('ascii.txt',{encoding: 'utf-8'});
console.log(ascii);

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({
    blocktrackers: true
}));

(async () => {
    for (let i =0; i < mhs.length; i++) {
        let NIM = mhs[i].nim;
        let password = mhs[i].password;
    
        const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-notifications'
        ]
    });
    // const hari = "Senin | Rabu | Kamis | Jumat | Sabtu\n";
    console.log("Today Is : " + today.toDateString());
    // const captureclass = "[ 5A ] , [5B] ";
    // console.log("Classes  :" + captureclass)
    const kelas = readlineSync.question('Kelas Apa : ')
    // console.log(hari)
    let allPage = await browser.pages();
    const page = await allPage[0];
    await page.goto(login, {
        waitUntil: 'networkidle2',
    });
    
    await sleep(2000)
    await page.waitForSelector('#username')
    await page.focus('#username')
    await page.keyboard.type(NIM)

    await sleep(1000)
    await page.waitForSelector('#password')
    await page.focus('#password')
    await page.keyboard.type(password)

    await page.waitForSelector('.my-auto > .intro-x > form > .flex > .ring-2')
    await page.click('.my-auto > .intro-x > form > .flex > .ring-2')
    if (page.url() == profile) {
        await sleep(1000);
        await page.goto(scollarship, {
            waitUntil: 'networkidle2',
       })
    //    const kelas = readlineSync.question('Kelas Apa : ')
             if (kelas === '5a') {
                const timetable = readlineSync.question('Absensi Hari Apa : ')
                if (timetable === 'senin') {
                    console.log("Perhatikan Kelas yang kamu isi (ini senin)")
                    await browser.close()
                }
                if (timetable === 'rabu') {
                    console.log("Perhatikan Kelas yang kamu isi (ini rabu)")
                    await browser.close()
                }
                if (timetable === 'kamis') {
                    console.log("Perhatikan Kelas yang kamu isi (ini kamis)")
                    await browser.close()
                }
          } 
            else {
                if (kelas === '5b') {
                    const jadwal = readlineSync.question('Absensi Hari apa ? : ')
                     if (jadwal === 'rabu') { 
    
                        await page.waitForSelector('.col-lg-4:nth-child(1) > .pricing-plan > .pricing-footer > .btn-group > .btn-primary')
                        await page.click('.col-lg-4:nth-child(1) > .pricing-plan > .pricing-footer > .btn-group > .btn-primary')
                        await sleep(2000);
                        await page.waitForSelector('.col-xl-3 > .info-tiles > form > center > .btn')
                        await page.click('.col-xl-3 > .info-tiles > form > center > .btn')
                        await page.goto(logout)
                        }   else {
                            await sleep(1000);
                            await page.goto(scollarship,{
                            waitUntil: 'networkidle2',
                        })
                            if (jadwal === 'sabtu') {
    
                                await page.waitForSelector('.col-lg-4:nth-child(2) > .pricing-plan > .pricing-footer > .btn-group > .btn-primary')
                                await page.click('.col-lg-4:nth-child(2) > .pricing-plan > .pricing-footer > .btn-group > .btn-primary')
    
                                await page.waitForSelector('.col-xl-3 > .info-tiles > form > center > .btn')
                                await page.click('.col-xl-3 > .info-tiles > form > center > .btn')
                                await page.goto(logout)
                                }
                        } 
                                    if (jadwal === 'jumat') {
    
                                        await page.waitForSelector('.col-lg-4:nth-child(3) > .pricing-plan > .pricing-footer > .btn-group > .btn-primary')
                                        await page.click('.col-lg-4:nth-child(3) > .pricing-plan > .pricing-footer > .btn-group > .btn-primary')
                                        // await page.waitForSelector('.col-xl-3 > .info-tiles > form > center > .btn')    
                                        // await page.click('.col-xl-3 > .info-tiles > form > center > .btn')
                                        console.log("Absensi Berhasil, Ingin Ulangi ? : (Y/N)")
                                        await page.goto(logout)
                                    }
                                    
             }
            
                            
         else {
            await sleep(1000,console.log("Jadwal Salah Atau Tidak Ada Jadwal Hari Ini.."));
            await page.goto(scollarship,{
                waitUntil: 'networkidle2',
            })
        }
    }
        if (page.url() == 'http://elearning.bsi.ac.id/user/profile') {
            await sleep(1000)

    
        }
    }
        

        
}})();
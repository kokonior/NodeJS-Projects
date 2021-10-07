const fetch = require('node-fetch');
const {
    exec,
    spawn
} = require('child_process');
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
// npm i node-fetch child_process puppeteer puppeteer-extra puppeteer-extra-plugin-stealth delay fs readline-sync console
const delay = require('delay');
const fs = require('fs');
const readlineSync = require('readline-sync');
const {
    Console
} = require('console');

const options = {
    waitUntil: 'networkidle2',
    timeout: 0
};

const regis = "https://signup.live.com/?lic=1";

const datafake = () => new Promise((resolve, reject) => {

    fetch('https://api.namefake.com/indonesian-indonesia', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
            },
        })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))

});


function randstr(length) {
    result = '';
    const characters = '012345678910';
    //const characters = '012345678910';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randchar(length) {
    result = '';
    const characters = 'qwertyuiopasdfghjklzxcvbnm';
    //const characters = '012345678910';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min
}

(async () => {

    const jumlah = await readlineSync.question('[?] Jumlah : ');

    for (a = 0; a < jumlah; a++) {


        const browser = await puppeteer.launch({
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false,
            devtools: false,
            //            args: [
            //            `--proxy-server=${proxy[p]}`,
            //            `--ignore-certificate-errors`
            //        ]
        })


        //const useragent = `Mozilla/4.${randstr(2)} (iPhone; U; CPU OS 6_2 like Mac OS X; en-en) AppleWebKit/5${randstr(2)}.${randstr(1)} (KHTML, like Gecko) Version/4.${randstr(1)} Mobile Safari/5${randstr(2)}.${randstr(2)}`;

        //page
        const page = await browser.newPage();

        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });
        await page.evaluateOnNewDocument(() => {
            // Overwrite the `plugins` property to use a custom getter.
            Object.defineProperty(navigator, 'plugins', {
                // This just needs to have `length > 0` for the current test,
                // but we could mock the plugins too if necessary.
                get: () => [1, 2, 3, 4, 5],
            });
        });
        //  await page.setUserAgent(useragent);
        //  await page.setGeolocation({latitude: -2.5489, longitude: 118.0149});
        await page.setViewport({
            width: 375,
            height: 667,
            isMobile: true
        });

        const data = await datafake();
        const datanama = data.name.split(" ")
        const nama1 = `${datanama[0].toLowerCase()}`;
        const nama2 = `${datanama[1].toLowerCase()}`;

        const day = await random(1, 28);
        const month = await random(1, 12);
        const email = `${datanama[0].toLowerCase()}${datanama[1].toLowerCase()}${randstr(3)}@outlook.com`; //format email reff
        const pass = `kucing123`;

        console.log(`[+] Regis Outlook ${email}`)

        await page.goto(regis, {
            waitUntil: ["networkidle0", "domcontentloaded"],
            timeout: 0
        })


        try {

            console.log(`  => Input Email : ${email}`)
            await page.waitForSelector("#MemberName")
            await page.type("#MemberName", email, {
                delay: 5
            })
            await page.click(`#iSignupAction`, {
                delay: 2000
            })

            console.log(`  => Input Password : ${pass}`)
            await page.waitForSelector("#PasswordInput")
            await page.type("#PasswordInput", pass, {
                delay: 5
            })
            await page.click(`#iSignupAction`, {
                delay: 2000
            })

            console.log(`  => Input Nama Depan : ${nama1}`)
            await page.waitForSelector(`#FirstName`)
            await page.type(`#FirstName`, nama1, {
                delay: 5
            })
            console.log(`  => Input Nama Depan : ${nama2}`)
            await page.waitForSelector(`#LastName`)
            await page.type(`#LastName`, nama2, {
                delay: 5
            })
            await page.click(`#iSignupAction`, {
                delay: 2000
            })

            await page.waitForSelector(`#BirthDay`)
            await page.select(`select#BirthDay`, `${day}`)
            await page.waitForSelector(`#BirthMonth`)
            await page.select(`select#BirthMonth`, `${month}`)
            await page.waitForSelector(`#BirthYear`)
            await page.type(`#BirthYear`, `1997`, {
                delay: 5
            })
            await page.click(`#iSignupAction`, {
                delay: 2000
            })

            
            await page.waitForSelector(`#HipEnforcementForm > div.text-title.forVisualHip`,{timeout:10000})
            const otp = await page.$eval(`#HipEnforcementForm > div.text-title.forVisualHip`, (element) => {
                return element.innerText
            });



            if (otp.includes("Create account")) {
                console.log(`  lanjut  capcha`)
                await readlineSync.question('SELESAI CAPCHA ENTER')


                await page.waitForSelector(`#idBtn_Back`)
                await page.click(`#idBtn_Back`, {
                    delay: 2000
                })

                console.log(`\x1b[32m`)
                console.log(`       BERHASIL REGISTER!!!`)
                console.log(`\x1b[37m`)


                fs.appendFile('akun.txt', `${email}|${pass}\n`, function(err) {

                    if (err) throw err;
                });
                await browser.close()

            } 


        } catch (error) {
            //await readlineSync.question('[?] CEK INPUT ');
        }
        try{
            await page.waitForSelector(`#HipPaneForm > div.text-title.forSmsHip`)
            const otp = await page.$eval(`#HipPaneForm > div.text-title.forSmsHip`, (element) => {
                return element.innerText
            });

            if (otp.includes("Add security info")) {
                console.log(`              `)
                console.log(`\x1b[31m`,`        IP MU BUSUK SIR!!!      `)
                console.log(`\x1b[37m`)
                await delay(2000)
                a = jumlah
                await browser.close()
                // throw error;
            }

        }catch{

        }

    }
})()
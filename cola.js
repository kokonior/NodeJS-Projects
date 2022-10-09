'use strict';

import delay from 'delay';
import moment from 'moment';
import chalk from 'chalk';
import puppeteer from 'puppeteer-extra'
import UserAgent from 'user-agents';

const cola = `https://ayo.coca-cola.co.id/c/sat-coke-ayo-9-70`;
const login = `https://accounts.google.com/`;

(async () => {


  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: false,
    devtools: false,
    args: [
      // '--proxy-server=socks5://sea.socks.ipvanish.com:1080',
      //   '--ignore-certificate-errors',
      //   '--ignore-certificate-errors-spki-list '
    ],
  });
  const userAgent = new UserAgent({
    deviceCategory: 'mobile'
  });
  const uAgent = userAgent.toString();

  console.log(chalk.yellow(uAgent));
  const page = await browser.newPage();
  await page.setGeolocation({ latitude: -7.8035, longitude: 110.3646 });
  await page.setUserAgent(uAgent);


  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://ayo.coca-cola.co.id/', ['geolocation']);

  // console.log(popup.url());

  const email = `cola1@nottoday.my.id`
  const pass = `kucing123`

  try {
    console.log(`[${moment().format("HH:mm:ss")}]`, chalk.blueBright(email))

    await page.goto(login, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000
    })

    await page.waitForSelector(`#identifierId`)
    await page.type(`#identifierId`, email)
    await delay(3000)
    await page.click(`#identifierNext > div > button > span`)
    await delay(5000)
    await page.type(`#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input`, pass)
    await page.click(`#passwordNext > div > button `)
    await page.waitForSelector(`#yDmH0d > c-wiz > div > div:nth-child(2) > div > c-wiz > c-wiz > div > div.s7iwrf.gMPiLc.Kdcijb > div > div > header > h1`)

    console.log(`[${moment().format("HH:mm:ss")}]`, chalk.greenBright(`Login Success`))


    await delay(5000)
    await page.goto(cola, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000
    })

    await page.waitForSelector(`#mat-dialog-0 > app-cookie-management > div > div.confirm-content > div:nth-child(2) > button`)
    await page.click(`#mat-dialog-0 > app-cookie-management > div > div.confirm-content > div:nth-child(2) > button`)
    await delay(5000)
    // await page.waitForFileChooser(`body > app-root > div > app-campaign > div > div.bottom-box > button`)
    await page.click(`body > app-root > div > app-campaign > div > div.bottom-box > button`)

    await page.waitForSelector(`body > app-root > div > app-login > div.login-page > div.login-container > div:nth-child(1) > button > span.mat-button-wrapper > span`)
    await delay(4000)
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));

    await page.click(`body > app-root > div > app-login > div.login-page > div.login-container > div:nth-child(1) > button > span.mat-button-wrapper > span`)
    await delay(5000)

    const popup = await newPagePromise;

    // console.log(popup.url());
    await popup.waitForSelector(`#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > div > ul > li.JDAKTe.ibdqA.W7Aapd.zpCp3.SmR8 > div > div.d2laFc > div > div.WBW9sf`)
    await popup.click(`#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > div > ul > li.JDAKTe.ibdqA.W7Aapd.zpCp3.SmR8 > div > div.d2laFc > div > div.WBW9sf`)


    await delay(4000)
    await page.waitForSelector(`#mat-dialog-0 > app-permission-dialog > div > div.permission-action > button.mat-focus-indicator.btn-full-width.btn-cancel.mat-raised-button.mat-button-base`)
    await page.click(`#mat-dialog-0 > app-permission-dialog > div > div.permission-action > button.mat-focus-indicator.btn-full-width.btn-cancel.mat-raised-button.mat-button-base`)

    await delay(1000)
    await page.click(`body > app-root > div > app-campaign > section > div > div.campaign-footer.ng-star-inserted > button`)
    console.log(`[${moment().format("HH:mm:ss")}]`, chalk.greenBright(`Claim Success`))

    await delay(1000)
    try {
      await page.click(`#mat-dialog-1 > app-redeem-checkbox-dialog > div > div:nth-child(1) > label > span.checkmark`, { timeout: 2000 })
      await delay(500)
      await page.click(`#mat-dialog-1 > app-redeem-checkbox-dialog > div > div:nth-child(3) > button`)
      await page.waitForSelector(`#mat-dialog-3 > app-bar-code > div > div.mat-dialog-content > app-code > div > div:nth-child(3) > div > app-barcode > div > div`)
      await delay(4000)
      await page.click(`#mat-dialog-3 > app-bar-code > div > div.mat-dialog-content > app-code > div > div:nth-child(3) > div > app-barcode > div > div`)
      const code = await page.$eval("#mat-dialog-4 > app-full-screen-code-dialog > div > div.flex-container > div > app-code > div > div.code-wrapper > div > app-barcode > div > p", (element) => {
        return element.innerText
      })
      console.log(`[${moment().format("HH:mm:ss")}]`, chalk.bgGrey(`CODE : ${code}`))
  
      await delay(3000)
      await page.screenshot({ path: `voc-cola/${code}.jpeg` });
    } catch (error) {
      await page.click(`#mat-dialog-1 > app-bar-code > div > div.mat-dialog-content > app-code > div > div:nth-child(3) > div > app-barcode > div > div > svg`)
      const code = await page.$eval("#mat-dialog-2 > app-full-screen-code-dialog > div > div.flex-container > div > app-code > div > div.code-wrapper > div > app-barcode > div > p", (element) => {
        return element.innerText
      })
      console.log(`[${moment().format("HH:mm:ss")}]`, chalk.bgGrey(`CODE : ${code}`))
  
      await delay(3000)
      await page.screenshot({ path: `voc-cola/${code}.jpeg` });
    }
   
    
    console.log(`[${moment().format("HH:mm:ss")}]`, chalk.greenBright(`Screnshot Success`))

    await browser.close()

  } catch (error) {
    console.log(error)
  }



  //   await browser.close();
})();

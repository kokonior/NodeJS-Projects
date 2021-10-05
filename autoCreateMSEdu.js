/**
 * @created by Izzeldin Addarda <contact@ijel.me>
 * @package Auto Create Account Microsoft 365 Educate
 */
const puppeteer = require('puppeteer');
const randomName = require('random-name');
const fsa = require("async-file");
const password = "Mazterin312";

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

(async () => {
    console.log("[+] Starting program...")
    const browser = await puppeteer.launch({
        headless: true,
        devtools: false
    });
    const microsoftPage = await browser.newPage();
    await microsoftPage.goto("https://products.office.com/es-Es/student?tab=students", {waitUntil: "networkidle2"});
    const tempMailPage = await browser.newPage();
    await tempMailPage.goto("https://od.obagg.com", {waitUntil: "networkidle2"});
    console.log("[+] Getting Email...");
    try {
        await tempMailPage.click("body > div.ui.fixed.borderless.menu > div > div.ui.item.mailaddress > div > i");
        await tempMailPage.waitForSelector("body > div.ui.fixed.borderless.menu > div > div.ui.item.mailaddress > div > div.menu.transition.visible > div:nth-child(2)", {visible: true, timeout: 6000});
        await tempMailPage.click("body > div.ui.fixed.borderless.menu > div > div.ui.item.mailaddress > div > div.menu.transition.visible > div:nth-child(2)");
        await tempMailPage.waitForSelector("body > div.ui.fixed.borderless.menu > div > div.ui.item.mailaddress > i.circular.copy.link.icon.copyable", {visible: true, timeout: 6000});
        await delay(3000);
        const imel = await tempMailPage.$eval("body > div.ui.fixed.borderless.menu > div > div.ui.item.mailaddress > i.circular.copy.link.icon.copyable", el => el.getAttribute("data-clipboard-text"));
        console.log(`[+] Success getting email ${imel.toString()}`);
        await microsoftPage.type("#pmgJS-Email", imel.toString());
        await microsoftPage.click("#HowToBuy-SignUpToOffice365-GetStarted");
        try {
            await microsoftPage.waitForSelector("a.skuselection:nth-child(1) > span:nth-child(1)", {visible: true, timeout:60000})
            await microsoftPage.click("a.skuselection:nth-child(1) > span:nth-child(1)")
            try{
                await microsoftPage.waitForSelector("#FirstName", {visible: true, timeout: 150000});
                await microsoftPage.type("#FirstName", randomName.first().toString());
                await microsoftPage.type("#LastName", randomName.last().toString());
                await microsoftPage.type("#Password", password.toString());
                await microsoftPage.type("#RePassword", password.toString());
                await tempMailPage.waitForSelector("#maillist > tr > td:nth-child(2)", {visible: true, timeout: 150000});
                console.log(`[+] Getting otp...`)
                const otp_code = await tempMailPage.$eval("#maillist > tr > td:nth-child(2)", el => (el.innerHTML.match(/\d+/g).join('')).toString());
                console.log(`[~] Success get otp, otp is ${otp_code}`)
                await microsoftPage.type("#SignupCode", otp_code.toString());
                await microsoftPage.select("#StepsData_SelectedRegion", 'US');
                await microsoftPage.click('a[id="MultiPageLayout_Next"] > div > span:nth-child(1)');
                console.log("[~] Signing up...")
                try{
                    await microsoftPage.waitForSelector("#persist", {visible: true, timeout: 150000});
                    console.log(`[+] Success create Office 365 Educate account ${imel} with password ${password}`);
                    fsa.appendFile("resultSuccess.txt", `${imel}|${password}\n`, {encoding: 'utf8'});
                }catch(e){
                    console.log("~ Failed to create account...");
                }
                
            } catch(e){
                console.log("~ Failed go to fill data page.." + e);
            }
        }catch(err) {
            console.log('Err, failed go to selection page..' + err);
        }
        await browser.close();
    }catch(err){
        console.log('Err, failed to retrieve email' + err);
    }
})();

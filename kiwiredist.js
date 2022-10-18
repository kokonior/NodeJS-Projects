const puppeteer = require('puppeteer');
const readLineSync  = require('readLine-sync');
const delay = require('delay');

(async  () => {
	
	var nomer  = readLineSync.question('INPUT RESI : ')
	const options = { waituntill: 'networkidle2' }
  	const browser = await puppeteer.launch({
  		headless: false,
  	});
 	const pages = await browser.pages();
    	const page = pages[0];
 	await page.goto('https://resi.id/lacak-resi-jnt', options);
  	const res1 = await page.$('#input-single')
  	await res1.type(nomer)
  	await delay(1000)
  	const selector = '#input-single-btn'
	await page.evaluate((selector) => document.querySelector(selector).click(), selector);
	await delay(3000)
	console.log('gud')
	if  (page.url() == 'https://resi.id/lacak-resi-jnt' ){
		console.log('manteb')
	}else{
		console.log('gagal')
	};
	console.log('selesai')
  	await browser.close()
})();

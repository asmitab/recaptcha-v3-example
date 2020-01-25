const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.ORIGIN);

  //Wait for 2s for all the scripts to load
  await page.waitForFunction(() => 'grecaptcha' in window);

  await page.type('#test-form-name', 'puppeteer');
  await page.type('#test-form-email', 'puppeteer');

  await page.click('#test-form-submit');

  await page.waitForNavigation();
  console.log('New Page URL:', page.url());

  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();

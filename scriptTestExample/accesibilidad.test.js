const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const { createHtmlReport } = require('axe-html-reporter');

describe('Emulando dispositivos', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null
    });
  });

  afterEach(async () => {
    await page.close();
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  test('Accebilidad Nativa', async () => {
    await page.goto('https://platzi.com', {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector('img');
    const snapshot = await page.accessibility.snapshot();
    console.log(snapshot);
  });

  test('Accebilidad con AXE', async () => {
    await page.setBypassCSP(true);

    await page.goto('https://platzi.com', {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector('img');

    const result = await new AxePuppeteer(page).analyze();
    console.log(result.violations);
  });

  test('Accebilidad con AXE con reporte HTML', async () => {
    await page.setBypassCSP(true);

    await page.goto('https://platzi.com', {
      waitUntil: 'networkidle2'
    });

    await page.waitForSelector('img');

    const rawAxeResults = await new AxePuppeteer(page).analyze();

    createHtmlReport({
      results: rawAxeResults,
      options: {
        projectKey: 'Mi primer reporte AXE',
        doNotCreateReportFile: false,
      }
    });
  });
});
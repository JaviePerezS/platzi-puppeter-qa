const puppeteer = require('puppeteer');

describe('Time outs', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(1000);
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });
  });

  afterEach(async () => {
    page = '';
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);
    await page.goto('https://platzi.com/', {
      waitUntil: 'networkidle2'
    });
  });

  test('should selector',  async () => {
    const selector = await page.waitForSelector('#cms-landings > section > section.Hero > div > p.Hero-content-message');
    const validate = await page.evaluate((selector) => selector.innerText, selector);
    expect(validate).toBe('¿Qué quieres lograr?');
  });
});
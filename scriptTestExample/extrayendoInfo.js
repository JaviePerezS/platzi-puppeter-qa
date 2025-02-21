const puppeteer = require('puppeteer');


describe('Tipos de espera', () => {
    let browser;
    beforeAll( async () => {
        browser = await puppeteer.launch({ headless: false, defaultViewport: null })
    });

    it('mostrar los tipos de espera', async () => {

        const page = await browser.newPage()

    }, 20000)

    afterAll(async () => {
        await browser.close()
    });
});
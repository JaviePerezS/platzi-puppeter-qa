// Emular los dispositivos de forma manual
const puppeteer = require('puppeteer')

describe('Emulando dispositivos de forma manual', () => {

    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        //Ejecutar en modo incognito
        page = await (await browser.createIncognitoBrowserContext()).newPage();

        page = await browser.newPage();
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' });
    }, 10000);

    afterAll(async () => {
        await browser.close();
    });
    
    test('Emular dispositivo móvil', async () => {
        await page.emulate({
            name: 'Mi dispositivo', 
            viewport:{
                width: 375,
                height: 667,
                deviceScaleFactor: 2, //propiedad para escalar el dispositivo
                isMobile: true,
                hasTouch: true, //tactil ?
                isLandscape: false //si está de forma horizontal
            },
            userAgent: 'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
        })
        await new Promise((resolve) => setTimeout(resolve, 3000));
    },350000)  
    
//Emulando los sitios como si fuesen de escritorio

/test('Emulando un sitio de escritorio', async () => {

    await page.setViewport({
        width: 1500,
        height: 800,
    })

    await new Promise((resolve) => setTimeout(resolve, 3000));

}, 3500000)

//Emulando tablets de forma vertical

test('Emulando una tablet en modo vertical', async () => {
    
    const { KnownDevices } = require('puppeteer');
    
    const tablet = KnownDevices['iPad Pro']
    
    await page.emulate(tablet)

    await new Promise((resolve) => setTimeout(resolve, 3000));

}, 3500000)

test('Emulando un en una tablet en modo landscape - (horizontal)', async () => {
    
    const { KnownDevices } = require('puppeteer');
    
    const tablet = KnownDevices['iPad landscape']
    
    await page.emulate(tablet)

    await new Promise((resolve) => setTimeout(resolve, 3000));

}, 3500000)

//Emulando un celular

test('Emulando un sitio en un celular', async () => {
    const { KnownDevices } = require('puppeteer');

    const iphone = KnownDevices['iPhone X']

    await page.emulate(iphone)

    await new Promise((resolve) => setTimeout(resolve, 2000));

//}, 3500000)

})
})
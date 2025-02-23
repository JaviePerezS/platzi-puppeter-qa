const puppeteer = require("puppeteer");

describe("Geolocalizacion",()=>{

        let browser
        let page
    
        beforeAll(async()=>{
            browser = await puppeteer.launch({
                headless:false,
                defaultViewport: null, 
                //slowMo: 500
            });

            page = await browser.newPage();
            //await page.goto("https://platzi.com", {waitUntil: "networkidle2"});

        },10000);
    
        afterAll(async ()=>{ 
            await browser.close();

        });


    it("Cambio de la geolocalizacion", async()=>{
        const context = browser.defaultBrowserContext();

        await context.overridePermissions("https://chercher.tech/practice/geo-location.html", ['geolocation']);

        await page.setGeolocation({latitude:90, longitude: 20});

        await page.goto("https://chercher.tech/practice/geo-location.html");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        await page.setGeolocation({latitude:90, longitude: 0});
        await page.goto("https://chercher.tech/practice/geo-location.html");
        await new Promise((resolve) => setTimeout(resolve, 5000));

    }, 35000);
})
```const puppeteer = require("puppeteer");
describe("Geolocalizacion",()=>{
        let browser        let page            beforeAll(async()=>{            browser = await puppeteer.launch({                headless:false,                defaultViewport: null,                 //slowMo: 500            });
            page = await browser.newPage();            //await page.goto("https://platzi.com", {waitUntil: "networkidle2"});
        },10000);            afterAll(async ()=>{             await browser.close();
        });

    it("Cambio de la geolocalizacion", async()=>{        const context = browser.defaultBrowserContext();
        await context.overridePermissions("https://chercher.tech/practice/geo-location.html", \['geolocation']);
        await page.setGeolocation({latitude:90, longitude: 20});
        await page.goto("https://chercher.tech/practice/geo-location.html");
        await new Promise((resolve) => setTimeout(resolve, 5000));        await page.setGeolocation({latitude:90, longitude: 0});        await page.goto("https://chercher.tech/practice/geo-location.html");        await new Promise((resolve) => setTimeout(resolve, 5000));
    }, 35000);})
```
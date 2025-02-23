const puppeteer = require('puppeteer');

describe('Capturas de pantalla', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        const context = await browser.createIncognitoBrowserContext();//MODO INCOGNITO comportamiento evadir modo incognito
        page = await context.newPage()
        //Aqui apuntamos la pantalla de la cual queremos apuntar
        await page.goto('https://www.google.com/', { waitUntil: 'networkidle0' });
    }, 10000);

    afterAll(async () => {
        await browser.close();
    });

    test('PDF de pantalla completa', async () => {

        let pdfCSS =[]
        pdfCSS.push('<style>')
        pdfCSS.push('h1{ font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path:'./google.pdf',
            format:'A4',
            printBackground : true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h2>' + 'Mira El Script que realice PDF con pupeteer' + '</h2>',
            footerTemplate: css + '<h2> page <span class="pageNumber"></span> of <span class="totalPages"></span></h2>',
            
            margin:{
                top:'100px',
                botton:'200px',
                right:'30px',
                left: '30px'

            }
        
        })
    })

    test('PDF de pantalla completa en modo landscape', async () => {

        let pdfCSS =[]
        pdfCSS.push('<style>')
        pdfCSS.push('h1{ font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path:'./googleLandscape.pdf',
            format:'A4',
            printBackground : true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h2>' + 'Mira El Script que realice PDF con pupeteer' + '</h2>',
            footerTemplate: css + '<h2> page <span class="pageNumber"></span> of <span class="totalPages"></span></h2>',
            
            margin:{
                top:'100px',
                botton:'200px',
                right:'30px',
                left: '30px'

            },
            lanscape: true
        })
    })

}, 350000)
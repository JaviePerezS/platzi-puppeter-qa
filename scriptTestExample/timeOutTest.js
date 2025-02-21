const puppeteer = require('puppeteer');

describe('Configuración de Timeouts en Puppeteer', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Iniciar el navegador antes de todas las pruebas
    browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  });

  afterAll(async () => {
    // Cerrar el navegador después de todas las pruebas
    await browser.close();
  });

  beforeEach(async () => {
    // Crear una nueva página antes de cada prueba
    page = await browser.newPage();
  });

  afterEach(() => {
    // Limpiar la página después de cada prueba
    page = null;
  });

  it('Timeout Global para la Página con page.setDefaultTimeout', async () => {
    // Configurar el tiempo de espera global para la página
    page.setDefaultTimeout(5000); // 5 segundos

    // Realizar operaciones que utilizarán el timeout global
    await page.goto('https://example.com');
    // Otras operaciones...

    // Restaurar a timeout predeterminado
    page.setDefaultTimeout(30000); // 30 segundos por defecto
  });

  it('Timeout de Navegación Específico con page.setDefaultNavigationTimeout', async () => {
    // Configurar el tiempo de espera específico para operaciones de navegación
    page.setDefaultNavigationTimeout(3000); // 3 segundos

    // Realizar operaciones de navegación que utilizarán el timeout específico
    await page.goto('https://example.com');
    // Otras operaciones...

    // Restaurar a timeout de navegación predeterminado
    page.setDefaultNavigationTimeout(30000); // 30 segundos por defecto
  });

  it('Timeout Específico para una Operación con waitUntil', async () => {
    // Especificar un tiempo de espera para esta operación particular
    const timeout = 2000; // 2 segundos

    // Realizar una operación de navegación con timeout específico
    await page.goto('https://example.com', { waitUntil: 'domcontentloaded', timeout });
    // Otras operaciones...
  });

  it('Timeout con page.waitForFunction', async () => {
    // Configurar un tiempo de espera para page.waitForFunction
    const timeoutInMilliseconds = 5000; // 5 segundos

    // Esperar hasta que se cumpla la condición o se alcance el timeout
    await page.waitForFunction(() => {
      // Condición a esperar
      return document.querySelector('#miElemento');
    }, { timeout: timeoutInMilliseconds });
  });

  it('Timeout con Jest.setTimeout', async () => {
    // Configurar el timeout global para esta prueba específica
    jest.setTimeout(10000); // 10 segundos

    // Realizar operaciones que utilizarán el timeout global
    await page.goto('https://example.com');
    // Otras operaciones...
  });
});
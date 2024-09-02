import { test, Browser, Page, expect } from '@playwright/test';
 
(async () => {
  let browser: Browser;
  let page: Page;
 
  test.describe('Navegación en www.freerangetesters.com', () => {
 
    const seccionesHeader = [
      { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
      { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
      { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
      { nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers' }
      
    ];

    const seccionesFooter = [
        {nombre: 'FAQ', url: '/faq', tituloEsperado: 'Preguntas Frecuentes'},
        {nombre: 'Contacto', url: '/contacto', tituloEsperado: 'Contacto'},
        {nombre: '¿Querés ser un sponsor?', url: '/sponsors', tituloEsperado: 'Sponsors'},
        {nombre: 'Empresas', url: '/servicios-a-empresas', tituloEsperado: 'Entrenamiento y Workshops profesionales'}
    ];

    for (const seccion of seccionesHeader) {
      test(`Validar redirección a la sección "${seccion.nombre}" del header`, async ({ page }) => {
        await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
          page.goto('https://www.freerangetesters.com');
          await expect(page).toHaveTitle('Free Range Testers');
        });
 
        await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
          page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click();
          await page.waitForURL(`**${seccion.url}`);
        });
 
        await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
          await expect(page).toHaveTitle(seccion.tituloEsperado); 
        });
      });
    }

    for (const seccion of seccionesFooter) {
        test(`Validar redirección a la sección "${seccion.nombre}" del footer`, async ({ page }) => {
          await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
            page.goto('https://www.freerangetesters.com');
            await expect(page).toHaveTitle('Free Range Testers');
          });
   
          await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
            page.locator('footer').getByRole('link', { name: seccion.nombre, exact: true }).click();
            await page.waitForURL(`**${seccion.url}`);
          });
   
          await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
            await expect(page).toHaveTitle(seccion.tituloEsperado); 
            
          });
        });
      }
 
  })
 
 
})(); 
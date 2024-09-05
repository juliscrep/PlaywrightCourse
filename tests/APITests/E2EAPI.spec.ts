import { test, expect } from '@playwright/test';
 
const REPO = 'PlaywrightCourse';
const USER = 'juliscrep';
 
// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext;
 
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});
 
test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al final.
    await apiContext.dispose();
});
 
test('El último issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: `[Feature] en repositorio "${REPO}"`,
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText( `[Feature] en repositorio "${REPO}"`);
});
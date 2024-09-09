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

test('Puedo modificar los valores de un feature', async ({ page }) => {
    // Obtiene la lista de issues
    const issues = await apiContext.get(`/repos/${USER}/${REPO}/issues`);
    const issueData = await issues.json();

    // Toma el número del primer issue
    const issueNumber = issueData[0].number;

    // Obtiene la fecha actual
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Modifica el issue
    const response = await apiContext.patch(`/repos/${USER}/${REPO}/issues/${issueNumber}`, {
        data: {
            title: `[Feature] modificado en repositorio "${REPO}"`,
            body: `Se modificó el feature por "${USER}" el día ${formattedDate}`
        }
    });

    expect(response.ok()).toBeTruthy();

    // Verifica el cambio en la interfaz
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    
    // Busca el issue modificado en la lista de issues
    const issueLink = page.locator(`a[data-hovercard-type='issue'][href$='/${issueNumber}']`);
    await expect(issueLink).toHaveText(`[Feature] modificado en repositorio "${REPO}"`);
});

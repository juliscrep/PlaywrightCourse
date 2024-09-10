import { test, expect } from '@playwright/test';
test("Genera un mock de una fruta que no viene de la API real ", async ({ page }) => {
    // Hacemos un mock de la API antes de navegar
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Melocotón', id: 26 }];
        await route.fulfill({ json });
    });
    
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    // Validamos que Melocotón está disponible
    await expect(page.getByText('Melocotón')).toBeVisible();
});


test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Coconut', id: 200 });
        // Obtenemos la respuesta real mientras que le agregamos un extra
        // al objeto JSON que va a estar siendo representado.
        await route.fulfill({ response, json });
    });
 
    
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    // Validamos que vino la respuesta real con el extra que le sumamos antes
    await expect(page.getByText('Coconut', { exact: true })).toBeVisible();
});
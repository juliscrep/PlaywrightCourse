import { test, expect } from '@playwright/test';
 
const REPO = 'PlaywrightCourse';
const USER = 'juliscrep';
 
test(`Puedo crear un issue en el repositorio "${REPO}" de GitHub`, async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: `[Bug] reporte en repositorio "${REPO}"`,
            body: `Descripción del bug reportado por "${USER}"`,
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: `[Bug] reporte en repositorio "${REPO}"`,
        body: `Descripción del bug reportado por "${USER}"`
    }));
});
 
test(`Puedo crear un feature request en el repositorio "${REPO}" de GitHub`, async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: `[Feature] request en repositorio "${REPO}"`,
            body: `Descripción del feature reportado por "${USER}"`,
        }
    });
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: `[Feature] request en repositorio "${REPO}"`,
        body: `Descripción del feature reportado por "${USER}"`
    }));
});
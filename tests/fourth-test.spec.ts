import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from './Pages/sandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;
    let sandbox: SandboxPage;
    let textoAEscribir = 'Estoy aprendiendo playwright';
    let deporte = 'Tennis';

    test.describe('Acciones en el Automation Sandbox', () => {

        test.beforeAll(async ({page }) => {
           sandbox = new SandboxPage(page);
        })
        
         
        test('Puedo seleccionar y deseleccionar un checkbox en el Sandbox', async ({ page }) => {
 
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
            
                await sandbox.checkPasta();
 
                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
 
            })
 
            await test.step('Puedo deseleccionar el checkbox Pasta', async () => {
                await sandbox.uncheckPasta();
 
                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').not.toBeChecked();
            })
 
        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {
            await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
              await page.goto('');
      
            });
      
            await test.step('Puedo seleccionar el radio button para No', async () => {
              await sandbox.selectRadioButton();

              await expect(sandbox.radioButton, 'El radio button no se seleccionó').toBeChecked();        
            })     
            
        })


        test('Click en el botón ID dinámico', async ({ page }) => {
            
            await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
              await page.goto('');
      
            });
      
            await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
              
              await sandbox.clickBotonIDDinamico(); 
      
              await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
          
              
            })
      
        })
        
        test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
            await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
              await page.goto('');
      
            });
      
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
              await expect(sandbox.campoTexto, 'El campo de texto no admite edición').toBeEditable();
              await sandbox.ingresarTextoEnCampo(textoAEscribir);
              await expect(sandbox.campoTexto, 'El campo de texto no tiene el mismo texto').toHaveValue(textoAEscribir);
              
            })      
            
        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
            await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
              await page.goto('');
      
            });
      
            await test.step('Puedo seleccionar un deporte del dropdown', async () => {
              await sandbox.seleccionarDeporteDropdown(deporte);
                   
            })     
            
        })

        test('Puedo seleccionar un dia del Dropdown dias de la semana', async ({ page }) => {
           
            await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
              await page.goto('');
      
            });
      
            await test.step('Puedo seleccionar un dia de la semana del dropdown', async () => {
              await sandbox.seleccionarDiaDeLaSemana();
                   
            })     
            
          })
    })
 
})();
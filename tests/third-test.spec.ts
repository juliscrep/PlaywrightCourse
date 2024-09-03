import { test, Browser, Page, expect } from '@playwright/test';
 
(async () => {
  let browser: Browser;
  let page: Page;
  let textoAEscribir = 'Estoy aprendiendo playwright';
 
  test.describe('Acciones en el Automation Sandbox', () => {
    test('Click en el botón ID dinámico', async ({ page }) => {      
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo hacer click en el botón con ID dinámico', async () => {

        const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
        await botonIDDinamico.click({ force: true }); 

        await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();   
        
      })

    })   

    test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
        await page.getByLabel('Un aburrido texto').isVisible()
        await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toBeEditable();
        await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);  
        await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toHaveValue(textoAEscribir);
        

        
      })      
      
    })

    test('Accedo a una nueva ventana donde aparece el sitio de Free Range Testers', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo visitar la pagina Free Range Testers haciendo clic en el enlace', async () => {
        await page.getByRole('link', { name: 'www.freerangetesters.com' }).click();
        await page.getByRole('link', { name: 'Wistia video thumbnail' }).isVisible();
      })      
      
    })

    
    test('Accedo al shadow DOM de Automation Sandbox', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo acceder al texto del shadow DOM', async () => {
        await page.getByRole('heading', { name: 'Shadow DOM', exact: true }).isVisible();
        await page.getByText('Este es un ejemplo de Shadow DOM para practicar automation testing.').isDisabled();
        
      })      
      
    })
  

    test('Puedo seleccionar y deseleccionar un checkbox en el sandbox', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
         await page.getByLabel('Pasta 🍝').check();
         await expect(page.getByLabel('Pasta 🍝'), 'El checkbox no esta seleccionado').toBeChecked(); //valida que el elemento este checkeado
      })

      await test.step('Puedo deseleccionar el checkbox para Pasta', async () => {
        await page.getByLabel('Pasta 🍝').uncheck(); 
        await expect(page.getByLabel('Pasta 🍝'), 'El checkbox esta seleccionado').not.toBeChecked(); //valida que el elemento no este checkeado
     })
      
    })

    test('Puedo seleccionar Radio Buttons', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo seleccionar el radio button para No', async () => {
        await page.getByLabel('No').check();
        await expect(page.getByLabel('No'), 'El radio button no se seleccionó').toBeChecked();        
      })     
      
    })

    test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo seleccionar un deporte del dropdown', async () => {
        await page.getByLabel('Dropdown').selectOption('Tennis');
             
      })     
      
    })

    test('Puedo seleccionar un dia del Dropdown dias de la semana', async ({ page }) => {
      
      test.info().annotations.push({
        type: 'User Story 21312',
        description: 'El usuario puede seleccionar un día del dropdown Días de la semana'
      });

      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo seleccionar un dia de la semana del dropdown', async () => {
        await page.getByRole('button', {name: 'Día de la semana'}).click();
        await page.getByRole('link', {name: 'Martes'}).click();
             
      })     
      
    })


    test('Los items del dropdown son los esperados', async ({ page }) => {
      await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })
      
      await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
        const deportes = ['Fútbol', 'Tennis', 'Basketball']

        for (let opcion of deportes) {
          const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
          if (element) {
            console.log(`La opción '${opcion}' está presente.`);
          } else {
            throw new Error(`La opción '${opcion}' no está presente.`);
          }
        }

      })

    })

    test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
      await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })

      await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
        const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
        const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
        
        //Saca una screen y la adjunta aunque el caso pase.
        await test.info().attach('screenshot', {
          body: await page.screenshot(),
          contentType: 'image/png',
        })
        expect(valoresColumnaNombres).toEqual(nombresEsperados);
      })
    })

    test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
      await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })

      await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
        //Creamos un arreglo con todos los valores de la tabla dinámica
        const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
        console.log(valoresTablaDinamica);

        //Hacemos una recarga para que cambien los valores
        await page.reload();

        //Creamos un segundo arreglo con los valores luego de la recarga
        const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
        console.log(valoresPostReload);

        //Validamos que todos los valores cambiaron para cada celda.
        expect(valoresTablaDinamica).not.toEqual(valoresPostReload);

      })
    })

    test('Ejemplo de Soft Assertions', async ({ page }) => {
      await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })
      await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
        await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
        await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
        await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
        await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
        await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
      })
    })

    
    test('Validando dentro de un popup', async ({ page }) => {
      await test.step('Dado que navego al sandbox', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })

      await test.step('Cuando hago click en el botón popup', async () => {
        await page.getByRole('button', { name: 'Mostrar popup' }).click();
      })

      await test.step('Puedo validar un elemento dentro del popup', async () => {
        
        await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        await page.getByRole('button', { name: 'Cerrar' }).click();
      })
    })
        
  })
 
 
})(); 
import { test, Browser, Page, expect } from '@playwright/test';
 
(async () => {
  let browser: Browser;
  let page: Page;
  let textoAEscribir = 'Estoy aprendiendo playwright';
 
  test.describe('Acciones en el Automation Sandbox', () => {
    test('Click en el botón ID dinámico', async ({ page }) => {
      test.fail(); // Anotación. Corre el test y si falla lo hace pasar. Si pasa entonces lo hace fallar. 
      
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
       // await page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' }).click();

        const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
        await botonIDDinamico.click({ force: true }); //se fuerza el click

        await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();

        // await botonIDDinamico.click({ button: 'right'}); //Hacer clic en el boton derecho
 
        // await botonIDDinamico.click({modifiers: ['Shift']}); //sostener la tecla shift

        // await botonIDDinamico.hover();      
        
      })

    })   

    test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
        await page.getByLabel('Un aburrido texto').isVisible()
        await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toBeEditable();
        await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir); //solo funciona con elementos input, textarea y contenteditable 
        await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toHaveValue(textoAEscribir);
        
        //await page.getByPlaceholder('Ingresá texto').type(textoAEscribir); simula que se escribe con las teclas
        //await page.getByPlaceholder('Ingresá texto').press('Enter'); presionar una tecla
        
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

    // Anotación tag @Sandbox solo ejecuta por terminal los test con este tag 
    // npx playwright test --grep "@Sandbox"
    test('Accedo al shadow DOM de Automation @Sandbox', async ({ page }) => {
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

    // Anotación personalizada
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

    test('Puedo subir archivos a Automation Sandbox - NO IMPLEMENTADO EN PROD', async ({ page }) => {
      test.fixme(); // Anotacion parecida a skip que hace que se saltee el test a la hora de la ejecucion.
                    // Indica que hay que arreglar el test 
      
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo agregar archivos para ser subidos', async () => {
        await page.getByLabel('Upload file').setInputFiles(['pathArchivo.pdf','invoice1.pdf','invoice2.pdf']);
        await page.getByLabel('Upload file').setInputFiles([]); //para eliminar lo que se subio   
             
      })     
      
    })

    test.fixme('Puedo hacer un drag and drop de elementos en Automation Sandbox', async ({ page }) => {
      await test.step(`Dado que navego al sandbox de automation de Free Range Testers`, async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

      });

      await test.step('Puedo hacer un drag and drop a un elemento', async () => {
        await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
      
      })     
      
    })


    test('Accedo al texto alternativo de una imagen', async ({ page }) => {

      await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
        page.goto('https://www.freerangetesters.com');
        await expect(page).toHaveTitle('Free Range Testers');
      });

      await test.step(`Cuando hago click en "Blog"`, async () => {
        page.locator('#page_header').getByRole('link', { name: 'Blog', exact: true }).click();
        await page.waitForURL(`**/blog`);
      });

      
      await test.step('Puedo acceder al texto alternativo del logo para ir a un posteo del blog', async () => {
       await page.getByAltText('Robot triste sobre fondo amarillo y una cruz blanca').click();
       await expect(page.locator(`xpath=//H1[@class="sc-gnpbhQ sc-gLXSEc ckfzRq cpRjzP"][text()='Automatizar y explorar no se excluyen mutuamente.']/self::H1`)).toBeVisible(); //no recomendado usar xpath y css

      })     
      
    })


    test('Accedo al testid de un elemento web en Free Range Tester', async ({ page }) => {

      await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
        page.goto('https://www.freerangetesters.com');
        
      });

           
      await test.step('Puedo acceder al elemento web por su testid', async () => {
       // await page.getByTestId('social-links').getByRole('link', { name: 'Linked_in Linked_in' }).click();
        await page.getByTestId('social-links').getByTitle('Linked_in').click();
      
      })     
      
    })

    test('Los items del dropdown son los esperados', async ({ page }) => {
      await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })
      
      await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
        const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Voley']

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

    // Anotación 'only' para que solo se ejecute este test
    test.only ('Validando dentro de un popup', async ({ page }) => {
      await test.step('Dado que navego al sandbox', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      })

      await test.step('Cuando hago click en el botón popup', async () => {
        await page.getByRole('button', { name: 'Mostrar popup' }).click();
      })

      await test.step('Puedo validar un elemento dentro del popup', async () => {
        
        await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        await page.getByRole('button', { name: 'Cerrar' }).click();

        //Ejemplo de manejo de un popup por lo general
        const popupPromise = page.waitForEvent('popup');
        await page.getByText('open the popup').click();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        console.log(await popup.title());

      })
    })

    // Anotación 'skip' sirve para saltear este test y que no se ejecute 
    test.skip('Ejemplos de varios locators', async ({ page }) => {

      await test.step(`Ejemplos de locators sin implementación en una página`, async () => {

        //Ejemplo de locator para filtrar por texto 

        await page.getByRole('listitem').filter({hasText: 'Playstation 5'}).getByRole('button', {name: 'Add to cart'}).click();

        //Ejemplo de locator para filtrar por otro locator  
      
        await page.getByRole('listitem')
        .filter({has: page.getByRole('heading', {name: 'Xbox Series X'})})
        .getByRole('button', {name: 'Add to cart'}).click();

        //Ejemplo de locator para filtrar por elemento visible

        page.locator('button').locator('visible=true').click();


        //Ejemplo de lista y como ubicar sus elementos

        page.getByText('naranja').click();

        page.getByRole('listitem').filter({hasText: 'naranja'}).click();

        page.getByRole('listitem').first();

        page.getByRole('listitem').nth(0);

        page.getByRole('listitem').last();
        
      });     
      
    })    


    //Ejemplo de como saltearnos la ejecución de un test a traves de una condición 

    test.only('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page, browserName }) => {
      test.skip(browserName === 'chromium', 'No anda este test en Chrome todavía');
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


        
  })
 
 
})(); 
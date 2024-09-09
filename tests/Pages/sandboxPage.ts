import { type Locator, type Page } from '@playwright/test';
 
export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;
    readonly radioButton: Locator;
    readonly botonIDDinamico: Locator;
    readonly campoTexto : Locator;
    readonly deportesDropdown: Locator;
    
 
    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByLabel('Pasta 🍝');
        this.radioButton = page.getByLabel('No');
        this.botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
        this.campoTexto = page.getByPlaceholder('Ingresá texto');
        this.deportesDropdown = page.getByLabel('Dropdown');
        
    }
 
    async checkPasta() {
        await this.pastaCheckbox.check();
    }

    async uncheckPasta(){
        await this.pastaCheckbox.uncheck();
    }

    async selectRadioButton(){
        await this.radioButton.check();
    }

    async clickBotonIDDinamico(){
        await this.botonIDDinamico.click();
    }

    async ingresarTextoEnCampo(textoAEscribir){
        this.campoTexto.fill(textoAEscribir);
    }

    async seleccionarDeporteDropdown(deporte){
        await this.deportesDropdown.selectOption(deporte);
    }
 
}
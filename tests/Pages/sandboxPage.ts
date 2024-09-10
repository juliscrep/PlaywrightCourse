import { type Locator, type Page } from '@playwright/test';
 
export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;
    readonly radioButton: Locator;
    readonly botonIDDinamico: Locator;
    readonly campoTexto : Locator;
    readonly deportesDropdown: Locator;
    readonly diaDeLaSemanaDropdown: Locator;
    readonly diaDeLaSemana: Locator;
    readonly shadowDOM : Locator;
    readonly DOMTexto: Locator;
    readonly popupButton: Locator;
    readonly textoPopup: Locator;
    readonly cerrarButton: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByLabel('Pasta 🍝');
        this.radioButton = page.getByLabel('No');
        this.botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
        this.campoTexto = page.getByPlaceholder('Ingresá texto');
        this.deportesDropdown = page.getByLabel('Dropdown');
        this.diaDeLaSemanaDropdown = page.getByRole('button', {name: 'Día de la semana'});
        this.diaDeLaSemana = page.getByRole('link', {name: 'Martes'});
        this.shadowDOM = page.getByRole('heading', { name: 'Shadow DOM' });
        this.DOMTexto = page.getByText('Este es un ejemplo de Shadow DOM para practicar automation testing.');   
        this.popupButton = page.getByRole('button', { name: 'Mostrar popup' });
        this.textoPopup = page.getByText('¿Viste? ¡Apareció un Pop-up!');
        this.cerrarButton = page.getByRole('button', { name: 'Cerrar' });
               
        
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

    async seleccionarDiaDeLaSemana(){
        await this.diaDeLaSemanaDropdown.click();
        await this.diaDeLaSemana.click();
    }

    async accederShadowDOM(){
        await this.shadowDOM.isVisible();
        await this.DOMTexto.isVisible();
        
    }

    async abrirPopUp(){
        this.popupButton.click();
    }

    async cerrarPopup(){
        await this.cerrarButton.click();
    }

    async obtenerValoresColumnaNombres(): Promise<string[]> {
        return await this.page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => 
            elements.map(element => element.textContent?.trim() || '')
        );
    }

    async obtenerValoresColumnaEdad(): Promise<number[]> {
        return await this.page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(3)', elements => 
            elements.map(element => {
                const texto = element.textContent?.trim() || '';
                return parseFloat(texto); // Convertir el texto en número
            })
        );
    }

    async obtenerValoresTablaDinamica(): Promise<string[]> {
        return await this.page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements =>
            elements.map(element => element.textContent?.trim() || '')
        );
    }
  

 
}
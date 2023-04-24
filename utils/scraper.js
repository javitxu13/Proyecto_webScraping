import puppeteer from "puppeteer";


class Scraper {
    constructor(){
        this.browser = null;
        this.page = null;
    }

  /**
 * Inicializa la instancia de Puppeteer y la página web que se va a manipular
 * @method
 * @async
 * @returns {Promise<void>}
 */

    async init(){
        this.browser = await puppeteer.launch({
            headless:true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        this.page = await this.browser.newPage();
    }

    /**
     * Obtiene el contenido de una página web
     * @method
     * @async
     * @param {string} url - URL de la página web
     */

    async getPageContent(url) {
        await this.page.goto(url);
        return await this.page.content();
      }

   /**
 * Cierra la instancia de Puppeteer y la página web que se está manipulando
 * @method
 * @async
 * @returns {Promise<void>}
 */

    async close(){
        await this.browser.close();
    }
}

export default Scraper;
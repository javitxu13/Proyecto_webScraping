import jsdom from 'jsdom';

/**
 * Clase que se encarga de parsear el HTML de la página web
 * @class 
 */
class Parser {
  /**
   * Constructor de la clase
   * @constructor
   * @param {string} html - HTML de la página web
   */
  constructor(html) {
    /**
     * @property {string} html - HTML de la página web
     * @private
     */
    this.html = html;
    this.loadDocument();
  }

  /**
   * Carga el documento HTML en el DOM
   * @method
   * @private
   */

  loadDocument() {
    const JSDOM = jsdom.JSDOM;
    const dom = new JSDOM(this.html);
    this.document = dom.window.document;
  }

  /**
   * Obtiene el título de la pregunta
   * @method
   * @returns {string} - Título de la pregunta
   */

  getQuestionAsDOM() {
    return this.document.querySelector('.question');
  }

  /**
   * Obtiene el título de la pregunta
   * @method
   * @returns {string} - Título de la pregunta
   */

  getQuestion() {
    const question = this.getQuestionAsDOM();
    const title = this.getTitle();
    const ask = this.getAsk(question);
    const votes = this.getVotesQuestion();
    const links = this.getComments(question);
    return {
      title,
      ask,
      votes,
      links,

    };
  }

  /**
   * Obtiene el título de la pregunta
   * @method
   * @returns {string} - Título de la pregunta
   */

  getTitle() {
    const title = this.document.querySelector('#question-header h1').textContent.trim();
    return title;
  }

  /**
   * Obtiene el comentario de la pregunta
   * @method
   * @returns {string} - Comentario de la pregunta
   */

  getAsk(element) {
    const ask = element.querySelector('.user-info .relativetime').textContent.trim();
    return ask;
  }

  /**
   * Obtiene el número de votos de la pregunta
   * @method
   * @returns {number} - Número de votos de la pregunta
   * @example
   */

  getVotesQuestion() {
    const votes = this.document.querySelector('.js-vote-count').textContent.trim();
    return parseInt(votes);
  }

  /**
   * Obtiene los comentarios de la pregunta
   * @method
   * @returns {string[]} - Comentarios de la pregunta
   */

  getLinks() {
    const links = Array.from(this.document.querySelectorAll("#search a"));
    return links.map((link) => link.href);
  }

  /**
   * Obtiene los comentarios de la pregunta
   * @method
   * @returns {string[]} - Comentarios de la pregunta
   */

  getComments(element) {
    const links = Array.from(element.querySelector(".comments-list").querySelectorAll("li"));
    return links.map((link) => link.textContent.trim());
  }


  /**
   * Obtiene las respuestas de la pregunta
   * @method
   * @returns {string[]} - Respuestas de la pregunta
   */

  getAnswerAsDOM() {
    return Array.from(this.document.querySelectorAll('.answer'));
  }

  /**
   * Obtiene las respuestas de la pregunta
   * @method
   * @returns {string[]} - Respuestas de la pregunta
   */

  answerQuestion() {
    const answers = this.getAnswerAsDOM();
    return answers.map((answer) => {
      const votes = this.getVoteAnswer(answer);
      const author = this.getAuthors(answer);
      const paragraphs = answer.innerHTML;
      return {
        votes,
        author,
        paragraphs,
      };
    });
  }

  /**
   * Obtiene el número de votos de la respuesta
   * @method
   * @returns {number} - Número de votos de la respuesta
   */

  getVoteAnswer(element) {
    const votes = element.querySelector('.js-vote-count').textContent.trim();
    return parseInt(votes);
  }

  /**
   * Obtiene el autor de la respuesta
   * @method
   * @returns {string} - Autor de la respuesta
   */

  getAuthors(element) {
    const author = element.querySelector('.user-details a').textContent.trim();
    return author;
  }

}

export default Parser;

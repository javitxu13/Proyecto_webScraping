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

  loadDocument() {
    const JSDOM = jsdom.JSDOM;
    const dom = new JSDOM(this.html);
    this.document = dom.window.document;
  }

  getQuestionAsDOM() {
    return this.document.querySelector('.question');
  }

  getQuestion() {
    const question = this.getQuestionAsDOM();
    const title = this.getTitle();
    const ask = this.getAsk(question);
    const votes = this.getVotesQuestion();
    const links = this.getLinks();
    return {
      title,
      ask,
      votes,
      links,

    };
  }

  getTitle() {
    const title = this.document.querySelector('#question-header h1').textContent.trim();
    return title;
  }

  getAsk(element) {
    const ask = element.querySelector('.user-info .relativetime').textContent.trim();
    return ask;
  }

  getVotesQuestion() {
    const votes = this.document.querySelector('.js-vote-count').textContent.trim();
    return parseInt(votes);
  }

  getLinks(element) {
    const links = Array.from (element.querySelector(".comments-list").querySelectorAll("li"));
    return links.map((link) => link.textContent.trim());
  }

  getAnswerAsDOM() {
    return Array.from(this.document.querySelectorAll('.answer'));
  }

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

  getVoteAnswer(element) {
    const votes = element.querySelector('.js-vote-count').textContent.trim();
    return parseInt(votes);
  }

  getAuthors(element) {
    const author = element.querySelector('.user-details a').textContent.trim();
    return author;
  }


  
}

export default Parser;

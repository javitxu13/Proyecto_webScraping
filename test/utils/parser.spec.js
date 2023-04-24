import Parser from '../../utils/parser.js';
import fs from 'fs';

/**
    Inicializa una nueva instancia de la clase Parser.
    @constructor
    @param {string} html - El contenido HTML a ser analizado.
    */

describe('Parser', () => {
  let parser;

  beforeAll(() => {
    const html = fs.readFileSync('./test/utils/test.html', 'utf8');
    parser = new Parser(html);
  });


  /**
    Prueba unitaria para el método getTitle de la clase Parser.
    Verifica si el método devuelve correctamente el título de la página HTML.
    @test {Parser#getTitle}
    */
  //preguntas
  it('Debería devolver el título de la página', () => {
    const question = parser.getQuestionAsDOM();
    const title = parser.getTitle(question);
    expect(title).toBe('What is the difference between a property and a variable');
  });

  /**
    Prueba unitaria para el método getAsk de la clase Parser.
    Verifica si el método devuelve correctamente la fecha y vistas de la pregunta HTML.
    @test {Parser#getAsk}
    */
  it('Debería devolver la fecha/vistas de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const ask = parser.getAsk(question);
    expect(ask).toBe('Dec 29, 2017 at 13:54');
  });

  it('Debería devolver el número de votos de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const votes = parser.getVotesQuestion(question);
    expect(votes).toBe(93);
  });

  it('Debería devolver los comentarios de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const links = parser.getComments(question);
    expect(links[0]).toContain('would normally be referred to as a field and not a variable.');
  });


  //respuestas
  it('Debería devolver el número de votos de la primera respuesta', () => {
    const answer = parser.getAnswerAsDOM();
    const votes = parser.getVoteAnswer(answer[0]);
    expect(votes).toBe(78);
  });


  it("Debería devolver el autor de la primera respuesta", () => {
    const answer = parser.getAnswerAsDOM();
    const author = parser.getAuthors(answer[0]);
    expect(author).toContain("Glorfindel");
  });

});









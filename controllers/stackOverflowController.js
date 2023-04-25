import Parser from '../utils/parser.js';
import Scraper from '../utils/scraper.js';
import googleSearchController from './googleSearchController.js';
import Question from '../models/question.js';
import Answer from '../models/answer.js';

/**
 * @param {*} query 
 * @returns 
 */

async function getContent(query) {
  const googleLinks = await googleSearchController.searchLinks(`stackoverflow ${query}`);
  const url = googleLinks.find(link => link.includes('stackoverflow.com/questions'));


  /**
   * Si no se encuentra ninguna pregunta en Stack Overflow para la consulta proporcionada,
   * se lanza un error.
   */
  if (!url) {
    throw new Error('No se encontraron preguntas en Stack Overflow para la consulta proporcionada.');
  }

  /**
   * Se obtiene el contenido de la página de la pregunta en Stack Overflow.
   * Se crea un objeto Parser para analizar el contenido de la página.
   * Se obtiene el título de la pregunta, el contenido de la pregunta y las respuestas.
   * Se busca en la base de datos si ya existe una pregunta con el mismo título.
   * Si no existe, se crea un nuevo modelo de pregunta y se guarda en la base de datos.
   * Se guardan las respuestas en la base de datos.
   * Se cierra el navegador.
   */

  const scraper = new Scraper();
  await scraper.init();
  const html = await scraper.getPageContent(url);
  const parser = new Parser(html);

  const title = parser.getTitle();
  const question = parser.getQuestion();
  const answers = parser.answerQuestion();

  /**
   * Se busca en la base de datos si ya existe una pregunta con el mismo título.
   * Si no existe, se crea un nuevo modelo de pregunta y se guarda en la base de datos.
   * Se guardan las respuestas en la base de datos.
   * Se cierra el navegador.
   * Se retorna el objeto con la pregunta y las respuestas.
   */

  let existingQuestion = await Question.findOne({ title });

  if (!existingQuestion) {
    const questionModel = new Question({
      query,
      title,
      content: question.content,
      ask: question.ask,
      links: question.links,
      votes: question.votes,
    });

    existingQuestion = await questionModel.save();
  }

  /**
   * Se guardan las respuestas en la base de datos.
   * Se cierra el navegador.
   * Se retorna el objeto con la pregunta y las respuestas.
   */

  const savedAnswers = await Promise.all(answers.map(async (answer) => {
    const answerModel = new Answer({
      query,
      title,
      content: answer.paragraphs,
      votes: answer.votes,
      author: answer.author,
    });

    await answerModel.save();
    return answerModel;
  }));

  await scraper.close();

  /**
   * Se retorna el objeto con la pregunta y las respuestas.
   * Se cierra el navegador.
   */

  return {
    query,
    title: existingQuestion.title,
    question: {
      content: existingQuestion.content,
      ask: existingQuestion.ask,
      links: existingQuestion.links,
      votes: existingQuestion.votes
    },
    answers: savedAnswers.map(answer => {
      return {
        content: answer.content,
        votes: answer.votes,
        author: answer.author
      };
    })
  };
}

export default {
  getContent,
};

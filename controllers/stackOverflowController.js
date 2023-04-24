import Parser from '../utils/parser.js';
import Scraper from '../utils/scraper.js';
import googleSearchController from './googleSearchController.js';
import Question from '../models/question.js';
import Answer from '../models/answer.js';

async function getContent(query) {
  const googleLinks = await googleSearchController.searchLinks(`stackoverflow ${query}`);
  const url = googleLinks.find(link => link.includes('stackoverflow.com/questions'));

  const scraper = new Scraper();
  await scraper.init();
  const html = await scraper.getPageContent(url);
  const parser = new Parser(html);

  if (!query) {
    query = "undefined";
  }

  const title = parser.getTitle();
  const question = parser.getQuestion();
  const answers = parser.answerQuestion();

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

  return {
    title: existingQuestion.title,
    question: existingQuestion.content,
    answers: savedAnswers.map(answer => answer.content),
  };
}

export default {
  getContent,
};





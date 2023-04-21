import Parser from '../utils/parser.js';
import Scraper from '../utils/scraper.js';
import googleSearchController from './googleSearchController.js';


async function getContent(query) {
    const googleLinks = await googleSearchController.searchLinks(`stackoverflow ${query}`);
    const url = googleLinks.find(link => link.includes('stackoverflow.com'));

    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);


    const title = parser.getTitle();
    const links = parser.getLinks();
    const votes = parser.getVotesQuestion();
    const ask = parser.getAsk();
    const vote = parser.getVoteAnswer();
    const author = parser.getAuthors();
    const paragraphs = parser.getParagraphs();


    scraper.close();

    return { title, links, votes, ask, vote, author, paragraphs };
}

export default { getContent };


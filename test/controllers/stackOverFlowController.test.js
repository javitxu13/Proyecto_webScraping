import stackOverflowController from "../../controllers/stackOverflowController.js";

describe("stackOverflowController", () => {
    it("Deberia conseguir el contenido de una pagina de stackoverflow", async () => {
        const query = "What is the difference between a property and a variable";
        const { title, question, answers } = await stackOverflowController.getContent(query);
        expect(title).toBe("What is the difference between a property and a variable");
        expect(question.ask).toBe("Dec 29, 2017 at 13:54");
        expect(question.votes).toBe(93);
        expect(question.links[0]).toContain("would normally be referred to as a field and not a variable.");
        expect(answers[0].author).toBe("Glorfindel");
        expect(answers[0].votes).toBe(78);
        expect(answers[0].paragraphs).toContain("The real question is, why should you care, and what to use?");
    }, 20000);
});
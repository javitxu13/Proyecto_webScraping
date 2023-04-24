import express from "express";
import stackOverflowController from "./controllers/stackOverflowController.js";

const app = express();

app.get("/", async (req, res) => {
    try{
        const  query  = req.query.q;
        const { title, question, answers } = await stackOverflowController.getContent(query);
        res.json({ title, question, answers });

    } catch (error) {
        //throw new Error(error);
        res.status(500).send("Hubo un error");
    }
        
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

 
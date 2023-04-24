import express from "express";
import stackOverflowController from "./controllers/stackOverflowController.js";
import path from "path";

const app = express();

app.get("/", async (req, res) => {
  try {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (error) {
    res.status(500).send("Hubo un error al cargar la página de Stack Overflow :(");
  }
});

app.get("/api", async (req, res) => {
  try {
    const query = req.query.q;
    const { title, question, answers } = await stackOverflowController.getContent(query);
    res.json({ title, question, answers });
  } catch (error) {
    res.status(500).send("Hubo un error al cargar la página de Stack Overflow :(");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

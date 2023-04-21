const express = require('express');
const Parser = require('./parser');

const app = express();

// Ruta para mostrar la pregunta
app.get('/question', (req, res) => {
  const parser = new Parser('test.html'); // reemplaza <html>...</html> con tu HTML
  const question = parser.getQuestion();
  res.send(`Pregunta: ${question.title}, Votos: ${question.votes}, Autor: ${question.ask}, Links: ${question.links}`);

});

// Ruta para mostrar las respuestas
app.get('/answers', (req, res) => {
  const parser = new Parser("test.html"); // reemplaza <html>...</html> con tu HTML
  const answers = parser.answerQuestion();
  let answerString = '';
  answers.forEach((answer) => {
    answerString += `Respuesta: ${answer.paragraphs}, Votos: ${answer.votes}, Autor: ${answer.author}<br>`;
  });
  res.send(answerString);
});

// Puerto en el que escucha el servidor
const PORT = 3001;

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));


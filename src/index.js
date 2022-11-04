const express = require('express');
const bodyParser = require('body-parser');
const readTalkersInfo = require('./Utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
// const INTERNAL_SERVER_ERROR = 500;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalkersInfo();

  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkersInfo();
  const talkerId = Number(req.params.id);
  const talker = talkers.find((t) => t.id === talkerId);
  if (talker) { 
    return res.status(HTTP_OK_STATUS).json(talker); 
}
  return res.status(NOT_FOUND).json({ 
    message: 'Pessoa palestrante não encontrada' });
});
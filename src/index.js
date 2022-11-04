const express = require('express');
const bodyParser = require('body-parser');
const readTalkersInfo = require('./Utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
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

  if (talkers.length === 0) return res.status(200).json([]);
  return res.status(200).json(talkers);
});
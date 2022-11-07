const express = require('express');
const bodyParser = require('body-parser');
const { readTalkersInfo, randomToken, writeTalkersInfo } = require('./Utils/fsUtils');
const { validateLogin, validateTalker } = require('./Utils/middleware/validators');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
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

app.post('/login', validateLogin, (_req, res) => {
  const token = randomToken();

  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateTalker, async (req, res) => {
  const { name, age, talk, watchedAt } = req.body;
  const talkers = await readTalkersInfo();
  const upId = talkers.sort((a, b) => b.id - a.id)[0].id;

  const talker = {
    id: upId + 1,
    name,
    age,
    talk,
    watchedAt,
  };

  writeTalkersInfo([...talker, talker]);
  
  return res.status(CREATED).json(talker);
});
const express = require('express');
const bodyParser = require('body-parser');
const { 
  readTalkersInfo, 
  writeTalkersInfo, 
  updateTalkersInfo, 
  deleteTalker } = require('./Utils/fsUtils');
const { 
  validateLogin, 
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  randomToken, 
  validateToken,
  // validateRatePut,
  // validateRatePut2,
   } = require('./Utils/middleware/validators');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
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

app.post('/talker', 
validateToken, 
validateName, 
validateAge,
validateTalk,
validateRate,
validateWatchedAt, async (req, res) => {
  const newTalker = req.body;
  const newTalkerId = await writeTalkersInfo(newTalker);
  
  return res.status(CREATED).json(newTalkerId);
});

app.put('/talker/:id', 
validateToken, 
validateName, 
validateAge,
validateTalk,
validateRate,
// validateRatePut2,
// validateRatePut,
validateWatchedAt,
async (req, res) => {
  const { id } = req.params;
  const updatedTalkersInfo = req.body;

  const updateTalker = await updateTalkersInfo(Number(id), updatedTalkersInfo);
  
  return res.status(HTTP_OK_STATUS).json(updateTalker);
});

app.delete('/talker/:id', 
validateToken,
async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  return res.status(NO_CONTENT).end();
});
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

async function readTalkersInfo() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

function randomToken() {
    return crypto.randomBytes(8).toString('hex');
}

async function writeTalkersInfo() {
  try {
    const currentTalkers = await readTalkersInfo();
    const newTalkerId = { id: currentTalkers.lenght + 1 };
    const newTalkers = [...currentTalkers, newTalkerId];
    await fs.writeFile(path.resolve(__dirname, '../talker.json'));
    return newTalkers;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

module.exports = { 
readTalkersInfo,
randomToken,
writeTalkersInfo,
};
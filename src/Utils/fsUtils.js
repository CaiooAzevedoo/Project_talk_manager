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

module.exports = { 
readTalkersInfo,
randomToken };
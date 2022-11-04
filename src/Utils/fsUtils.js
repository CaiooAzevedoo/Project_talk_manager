const fs = require('fs').promises;
const path = require('path');

async function readTalkersInfo() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

const regex = /[A-Za-z](_?([a-zA-Z]|[0-9]))*/;
const randomToken = () => regex;

module.exports = { readTalkersInfo,
randomToken };
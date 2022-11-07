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

async function writeTalkersInfo(newTalker) {
  try {
    const currentTalkers = await readTalkersInfo();
    const newTalkerId = { id: currentTalkers.lenght + 1, ...newTalker };
    const newTalkers = [...currentTalkers, newTalkerId];
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(newTalkers));
    return newTalkers;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

module.exports = { 
readTalkersInfo,
writeTalkersInfo,
};
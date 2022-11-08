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
    const newTalkerId = { id: currentTalkers.length + 1, ...newTalker };
    const allTalkers = JSON.stringify([...currentTalkers, newTalkerId]);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), allTalkers);
    return newTalkerId;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function updateTalkersInfo(id, updatedTalkersInfo) {
  const currentTalkers = await readTalkersInfo();
  const updateTalker = { id, ...updatedTalkersInfo };
  const updatedTalkers = currentTalkers.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === updateTalker.id) { 
      return [...talkersList, updateTalker];
    } return [...talkersList, currentTalker];
  }, []);

  const updatedInfo = JSON.stringify(updatedTalkers);
  try { 
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), updatedInfo);
    return updateTalker;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}
async function deleteTalker(id) {
  const currentTalkers = await readTalkersInfo();
  const updatedTalkers = currentTalkers.filter((ctalker) => ctalker.id !== id);
  const updatedInfo = JSON.stringify(updatedTalkers);
  try { 
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), updatedInfo);
    return updatedTalkers;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

module.exports = { 
readTalkersInfo,
writeTalkersInfo,
updateTalkersInfo,
deleteTalker,
};
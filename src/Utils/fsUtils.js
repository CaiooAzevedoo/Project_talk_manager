const fs = require('fs/promises');
const path = require('path');

async function readTalkersInfo() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = readTalkersInfo;
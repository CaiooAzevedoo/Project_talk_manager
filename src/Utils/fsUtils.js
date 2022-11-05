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

function validateEmail(email) {
    if (!email) { 
        return 'O campo "email" é obrigatório'; 
}
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { 
        // https://regexr.com/3e48o //
        return 'O "email" deve ter o formato "email@email.com"'; 
}
}
  
function validatePassword(password) {
    if (!password) return 'O campo "password" é obrigatório';
    if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
}

module.exports = { 
readTalkersInfo,
randomToken,
validateEmail,
validatePassword };
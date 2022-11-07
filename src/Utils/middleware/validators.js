const crypto = require('crypto');
// const HTTP_OK_STATUS = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
// const NOT_FOUND = 404;
// const INTERNAL_SERVER_ERROR = 500;
// const PORT = '3000';

function validateEmail(email, res) {
    if (!email) {
        return res.status(BAD_REQUEST).json({ 
            message: 'O campo "email" é obrigatório' });
}
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { 
        // https://regexr.com/3e48o //
        return res.status(BAD_REQUEST).json({ 
            message: 'O "email" deve ter o formato "email@email.com"' });
}
return null;
}
  
function validatePassword(password, res) {
    if (!password) {
 return res.status(BAD_REQUEST).json({ 
        message: 'O campo "password" é obrigatório' }); 
}
    if (password.length < 6) {
        return res.status(BAD_REQUEST).json({ 
               message: 'O "password" deve ter pelo menos 6 caracteres' }); 
       }
}

function randomToken() {
    return crypto.randomBytes(8).toString('hex');
}

async function validateLogin(req, res, next) {
    const { email, password } = req.body;
    return validateEmail(email, res) || validatePassword(password, res)
    || next();
}

function validateToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) { 
        return res.status(UNAUTHORIZED).json({ 
            message: 'Token não encontrado' }); 
        }
    if (authorization.length !== 16) { 
        return res.status(UNAUTHORIZED).json({ message: 'Token inválido' }); 
    }
   return next();
   }
   
function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "name" é obrigatório',
        });
    }
    if (name.length < 3) {
        return res.status(BAD_REQUEST).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    return next();
}

function validateAge(req, res, next) {
    const { age } = req.body;
    if (!age) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "age" é obrigatório',
        });
    }
    if (age < 18) {
        return res.status(BAD_REQUEST).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }
    return next();
}

function validadteTalk(req, res, next) {
    const { talk } = req.body;
    if (!talk) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
    return next();
}

function validadteWatchedAt(req, res, next) {
    const { talk } = req.body;
    if (!talk.watchedAt) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "watchedAt" é obrigatório',
        });
    }
    if (!/[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/.test(talk.watchedAt)) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    return next();
}

function validadteRate(req, res, next) {
    const { talk } = req.body;
    if (!talk.rate) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
    return next();
}

module.exports = {
validateLogin,
validateName,
validateAge,
validadteTalk,
validadteWatchedAt,
validadteRate,
randomToken,
validateToken,
};
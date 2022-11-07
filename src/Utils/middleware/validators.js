// const HTTP_OK_STATUS = 200;
const BAD_REQUEST = 400;
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

async function validateLogin(req, res, next) {
    const { email, password } = req.body;
    return validateEmail(email, res) || validatePassword(password, res)
    || next();
}

function validateName(name, res) {
    if (!name) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "name" é obrigatório',
        });
    }
    if (name < 3) {
        return res.status(BAD_REQUEST).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
}

function validateAge(age, res) {
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
}

function validadteWatchedAt(watchedAt, res) {
    if (!watchedAt) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "watchedAt" é obrigatório',
        });
    }
    if (/(\d{4})[-./](\d{2})[-./](\d{2})/.test(watchedAt)) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
}

function validadteRate(rate, res) {
    if (!rate) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (rate < 1 || rate > 5) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
}

function validateTalker(talk, res, next) {
    const { name, age, watchedAt, rate } = res.body;
    return validateName(name, res) 
    || validateAge(age, res) 
    || validadteWatchedAt(watchedAt, res) 
    || validadteRate(rate, res) 
    || next();
}

module.exports = {
validateLogin,
validateTalker,
};
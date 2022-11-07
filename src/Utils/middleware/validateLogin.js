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

module.exports = {
validateEmail,
validatePassword,
validateLogin,
};
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY_CRYPT;

function sign(data){
    return jwt.sign({data}, KEY)
}
function verify(token){
    return jwt.verify(token, KEY)
    // da erro entao tratar com try catch
}
function decode(token){
    // retorna null senao achar certo
    return jwt.decode(token)
}

module.exports = {
    sign,
    verify,
    decode
}
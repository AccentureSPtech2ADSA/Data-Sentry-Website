const {verify} = require('../auth/jwt')
/**
 * 
 * @param {import('express').Request} req 
 */
function authJwt(req,res,next){
    try {
        const authToken = req.headers.authorization;
        const token = authToken.split(' ')[1];

        const payloadToken = verify(token) ? true : false;
        if(payloadToken){
            next();
        }
    } catch (error) {
        res
        .json({
          data: null,
          msg: "User nao autorizado. Parado no middleware de authJwt",
          status: 401,
        })
        .status(401);
    }
}

module.exports = {
    authJwt
}
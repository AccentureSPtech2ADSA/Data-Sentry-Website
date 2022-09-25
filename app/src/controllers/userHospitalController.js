var usuarioModel = require("../models/usuarioModel");
var userHospitalModel = require("../models/userHospitalModel");

/**
 * @param {Request} req 
 * @param {Response} res 
 */

async function insertUsuario(req,res){
    //res.send("Estou na controller do hospital");
    // res.send(hospitalModel.insert());
    console.log(`req.body`, req.body)

    if(Object.values(req.body).length !== 3){
        const msg = "Campos invalidos, valide no arquivo hospital controller quais os camposq que essa requisicao pede." ;
        res
        .json({
            msg: msg
        })
        .status(404)
    }else{
        const parametros = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        res
        .json(await userHospitalModel.insertUsuario(parametros))
        .status(201)
    }
}

module.exports = {
    insertUsuario
}
var usuarioModel = require("../models/usuarioModel");
var hospitalModel = require("../models/hospitalModel");

/**
 * @param {Request} req 
 * @param {Response} res 
 */
async function insert(req,res){
    //res.send("Estou na controller do hospital");
    // res.send(hospitalModel.insert());
    console.log(`req.body`, req.body)

    if(Object.values(req.body).length !== 7){
        const msg = "Campos invalidos, valide no arquivo hospital controller quais os camposq que essa requisicao pede." ;
        res
        .json({
            msg: msg
        })
        .status(404)
    }else{
        const parametros = {
            cep: req.body.cep,
            cnpj: req.body.cnpj,
            complement: req.body.complement, 
            corporateName: req.body.corporateName, 
            fantasyName: req.body.fantasyName, 
            numberAdress: req.body.numberAdress, 
            unit: req.body.unit
        }
        res
        .json(await hospitalModel.insert(parametros))
        .status(201)
    }
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    entrar,
    insert
}
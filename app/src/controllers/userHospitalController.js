var userHospitalModel = require("../models/userHospitalModel");
const { sign } = require("../util/auth/jwt");
const { enviarEmail } = require("../util/email/emailService");
/**
 * @param {Request} req
 * @param {Response} res
 */
async function insertUsuario(req, res) {
  console.log(req.body)
  //   console.log(`req.body`, req.body);
  // if (Object.values(req.body).length !== 5) {
  //   const msg =
  //     "Campos invalidos, valide no arquivo userHospitalController quais os campos que essa requisicao pede. (funcão insertUsuario de userHospitalController.js)";
  //   res
  //     .json({
  //       data: null,
  //       msg: msg,
  //       status: 404,
  //     })
  //     .status(404);
  // } else {
    const parametros = {
      name: req.body.name,
      email: req.body.email,
      telefone: req.body.telefone,
      password: req.body.password,
      manager: req.body.manager || null,
      hospital: req.body.hospital || null,
    };
    const userHospitalResult = await userHospitalModel.insertUsuario(
      parametros
    );
    res.json(userHospitalResult).status(userHospitalResult.status);
  }
// }
async function login(req, res) {
  //   console.log(`req.body`, req.body);
  if (Object.values(req.body).length !== 2) {
    const msg =
      "Campos invalidos, valide no arquivo userHospitalController quais os campos que essa requisicao pede. (funcão login de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    };
    const userHospitalResult = await userHospitalModel.login(parametros);
    console.log(userHospitalResult.data);

    if (userHospitalResult.data && userHospitalResult.data[0] && userHospitalResult.data[0].length == 0) {
      res
        .json({
          data: null,
          msg: "Email ou senha incorretos",
          status: 404,
        })
        .status(404);
      return;
    }
    const tokenLogin = sign(userHospitalResult.data[0][0]);
    userHospitalResult.token = tokenLogin;
    res.json(userHospitalResult).status(userHospitalResult.status);
  }
}
async function sendEmailToResetPassword(req, res) {
  const email = req.body.email;

  if (email == "" || email == undefined) {
    const msg = "Email esta indefinido";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const req = await userHospitalModel.isEmailsExitsInDatabase(email);
    console.log("req user model enviar email isEmailExists", req);

    if(!req.data || !req.data[0] || !req.data[0].name){
      res
      .json({
        data: null,
        msg: "Email não existe na nossa base de dados",
        status: 404,
      })
      .status(404);
    }
    const name = req.data[0].name;
    const token = sign(req.data[0]);
    if (req.status == 200) {
      try {
        let htmlMessage = `
        <p style='font-size: 18px;'><strong>Olá, ${name}! Tudo bem?</strong></p>
        <p>
        Esqueceu sua senha? Não tem problema! <br>
        Com o sistema do DataSentry seu problema já foi pensado e resolvido por nós!
        <br>
        </p>
        <p>
        Clique neste <a href='${
          process.env.HOST + `/redefinicao_senha.html?token=${token}`
        }' style='color: #23AFAE'>link</a> para redefinir sua senha!
        </p>
        `;
        let resEmail = await enviarEmail(
          htmlMessage,
          email,
          htmlMessage,
          "Redefinição Email"
        );
        console.log(resEmail);

        const shortMessage = "E-mail enviado com sucesso";
        const longMessage = `Enviamos um e-mail para sua caixa de entrada`;
        res
          .json({
            data: resEmail,
            shortMessage: shortMessage,
            longMessage: longMessage,
            status: 200,
          })
          .status(200);
        return;
      } catch (error) {
        res
          .json({
            data: null,
            msg: error,
            status: 500,
          })
          .status(500);
      }
    }
  }
}
async function changePassword(req, res) {
  const id = req.body.id;
  const newPass = req.body.newPass;

  if (
    Object.values(req.body).length !== 2 ||
    id == undefined ||
    newPass == undefined
  ) {
    const msg =
      "Campos invalidos, valide no arquivo changePassword quais os campos que essa requisicao pede. (funcão login de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const changePassResult = await userHospitalModel.changePassUser({
      id,
      newPass,
    });
    console.dir(changePassResult);
    if (changePassResult.status == 200 || changePassResult.status == 201) {
      changePassResult.longMessage = `Senha alterada com sucesso!`;
      changePassResult.shortMessage = `Senha atualizada.`;
      res.json(changePassResult);
    } else {
      res.status(changePassResult.status);
      res.json(changePassResult);
    }
  }
}
async function updateAnalist(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const id = req.body.id;
  if (
    Object.values(req.body).length !== 4) {
    const msg =
      "Campos invalidos, valide no arquivo updateAnalist quais os campos que essa requisicao pede. (funcão login de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const updAnalistResult = await userHospitalModel.updateAnalist({
      name,
      email,
      telefone,
      id,
    });
    console.dir(updAnalistResult);
    if (updAnalistResult.status == 200 || updAnalistResult.status == 201) {
      updAnalistResult.longMessage = `Analista atualizado com sucesso!`;
      updAnalistResult.shortMessage = `Analista atualizado.`;
      res.json(updAnalistResult);
    } else {
      res.status(updAnalistResult.status);
      res.json(updAnalistResult);
    }
  }
}
async function deleteUser(req, res) {
  const id = req.body.id;
  const fk = req.body.fk || 0;

  console.log(req.body);

  if (Object.values(req.body).length < 1 || id == undefined || Object.values(req.body).length > 2) {
    const msg =
      "Campos invalidos, valide no arquivo deleteUser quais os campos que essa requisicao pede. (funcão login de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const deleteUserResult = await userHospitalModel.deleteUser({
      id: id,
      fkHospital: fk
    });
    console.dir(deleteUserResult);
    if (deleteUserResult.status == 200 || deleteUserResult == 201) {
      deleteUserResult.longMessage = `Usuário excluído com sucesso da base de dados!`;
      deleteUserResult.shortMessage = `Usuário excluído.`;
      res.json(deleteUserResult);
    } else {
      res.status(deleteUserResult.status);
      res.json(deleteUserResult);
    }
  }
}
async function getListAnalists(req, res) {
  const fkHospital = req.params.fkHospital;

  if (Object.values(req.params).length !== 1 || fkHospital == undefined) {
    const msg =
      "Campos invalidos, valide no arquivo getListAnalists quais os campos que essa requisicao pede. (funcão login de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const listAnalists = await userHospitalModel.getListAnalists({
      fkHospital,
    });
    console.dir(listAnalists);
    if (listAnalists.status == 200 || listAnalists.status == 201) {
      listAnalists.longMessage = `Lista de usuarios analistas do hosital ${fkHospital}`;
      listAnalists.shortMessage = `Lista de analistas.`;
      res.json(listAnalists);
    } else {
      res.status(listAnalists.status);
      res.json(listAnalists);
    }
  }
}
module.exports = {
  insertUsuario,
  login,
  sendEmailToResetPassword,
  changePassword,
  getListAnalists,
  deleteUser,
  updateAnalist,
};

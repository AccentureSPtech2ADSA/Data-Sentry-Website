var userHospitalModel = require("../models/userHospitalModel");
const { sign } = require("../util/auth/jwt");
const { enviarEmail } = require("../util/email/emailService");
/**
 * @param {Request} req
 * @param {Response} res
 */
async function insertUsuario(req, res) {
  //   console.log(`req.body`, req.body);
  if (Object.values(req.body).length !== 5) {
    const msg =
      "Campos invalidos, valide no arquivo userHospitalController quais os campos que essa requisicao pede. (funcão insertUsuario de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      manager: req.body.manager || null,
      hospital: req.body.hospital || null,
    };
    const userHospitalResult = await userHospitalModel.insertUsuario(
      parametros
    );
    res.json(userHospitalResult).status(userHospitalResult.status);
  }
}
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
    if (userHospitalResult.data[0].length == 0) {
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

    const name = req.data[0].name;
    const token = sign(req.data[0]);
    if (req.status == 200) {
      try {
        let htmlMessage = `
        <p style='font-size: 18px;'><strong>Olá ${name}! Tudo bem?</strong></p>
        <p>
        Esqueceu sua senha? Não tem problemas! <br>
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
    if (changePassResult.status == 200 || changePassResult == 201) {
      changePassResult.longMessage = `Senha alterada com sucesso!`;
      changePassResult.shortMessage = `Senha atualizada.`;
      res.json(changePassResult);
    } else {
      res.status(changePassResult.status);
      res.json(changePassResult);
    }
  }
}

async function deleteUser(req, res) {
  const id = req.body.id;

  if (
    Object.values(req.body).length !== 2 ||
    id == undefined
  ) {
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
      id,
    });
    console.dir(deleteUserResult);
    if (deleteUserResult.status == 200 || deleteUserResult == 201) {
      deleteUserResult.longMessage = `Usuário excluído com sucesso!`;
      deleteUserResult.shortMessage = `Senha atualizada.`;
      res.json(deleteUserResult);
    } else {
      res.status(deleteUserResult.status);
      res.json(deleteUserResult);
    }
  }
}
module.exports = {
  insertUsuario,
  login,
  sendEmailToResetPassword,
  changePassword,
  deleteUser
};

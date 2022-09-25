const nodemailer = require("nodemailer");

const transportadorArgument = {
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
};

async function enviarEmail(htmlBody, receiver, body, subject) {
  //   const contaTeste = await nodemailer.createTestAccount();

  const transportador = nodemailer.createTransport(transportadorArgument);

  const info = await transportador.sendMail({
    from: `"${process.env.PROJECT_NAME}" <${process.env.NODEMAILER_EMAIL_FROM}>`,
    to: receiver,
    subject: subject,
    text: body,
    html: htmlBody,
  });

  console.log("email info", info);
}

module.exports = {
  enviarEmail,
};

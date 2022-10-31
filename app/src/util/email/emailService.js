const nodemailer = require("nodemailer");

function cleanHTML (html){
  return html.replace(/(&lt;([^>]+)>)/gi, "");
}
function createHtml(content){
  let html = 
  `
  <div style='font-family: sans-serif; background: #F1F2F4; color: #343941; padding: 36px 12px; height: 600px'>
        <div style="max-width: 400px; margin: 0 auto; width: 100%;">
            <div id="content" style='font-size: 14px;'>
              ${content}
            </div>
            <div style='background: #CFD3D8; margin: 8px auto; width: 100%; height: 2px;'>
            <div id="footer" style='text-align:center; padding-top: 20px'>
                <img src="cid:logo" alt="Logotipo" width='180'>
                <br>
                <p style='font-size: 12px; font-family: sans-serif'>
                    <i>
                        Copyright © 2022 - Data Sentry. <br> Todos os direitos reservado
                    </i>
                </p>
            </div>  
        </div>
    </div>
  `
  return html
}
const transportadorArgument = {
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
};
// const transportadorArgument = (`smtps://${process.env.NODEMAILER_USER}:${process.env.NODEMAILER_PASSWORD}@${process.env.NODEMAILER_HOST}`);

async function enviarEmail(htmlBody, receiver, body, subject) {
  try {
    
    const transportador = nodemailer.createTransport(transportadorArgument);
    const info = await transportador.sendMail({
      from: `"${process.env.PROJECT_NAME}" <${process.env.NODEMAILER_EMAIL_FROM}>`,
      to: receiver,
      attachments: [
        {
          path: __dirname+ '/logo.png',
          cid: 'logo',
          filename: 'logo-escudo-texto-centro',
        }
      ],
      subject: subject,
      text: body,
      html: createHtml(htmlBody),
    });
  
    console.log("email info", info);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  enviarEmail,
  cleanHTML
};

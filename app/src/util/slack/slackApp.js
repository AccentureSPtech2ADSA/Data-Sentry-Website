const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

async function sendMessage(req, res) {
    let type = req.body.type;
    let title = req.body.title;
    let message = req.body.message;
    await webhook.send({
        text: `${type} / ${title}: ${message}`,
    });

    res.json({
        message: `Mensagem enviada com sucesso`
    }).status(200)
}


module.exports = {
    sendMessage
}
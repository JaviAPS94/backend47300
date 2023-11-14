import express from 'express';
import twilio from 'twilio';

const app = express();

const TWILIO_ACCOUNT_SID = 'AC4ab01b6201524b22fa2bef2b2d986e9f';
const TWILIO_AUTH_TOKEN = '71f1b081da09fa0f2e41c6d8947d7af6';
const TWILIO_PHONE_NUMBER= '+12055128439';

const client = twilio(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
)

app.get('/sms', async (req, res) => {
    await client.messages.create({
       from: TWILIO_PHONE_NUMBER,
       to: '+593958963171',
       body: 'Este es un mensaje de prueba de SMS clase 55575'
    });

    res.send('SMS enviado');
});

app.get('/sms-custom', async (req, res) => {
    const { name, product } = req.query;

    await client.messages.create({
       from: TWILIO_PHONE_NUMBER,
       to: '+593958963171',
       body: `Hola ${name} gracias por tu compra. Tu producto es ${product}`
    });

    res.send('SMS enviado');
});

app.get('/whatsapp', async(req, res) => {
    const { name, product } = req.query;

    await client.messages.create({
       from: 'whatsapp:+14155238886',
       to: 'whatsapp:+593958963171',
       body: `Hola ${name} gracias por tu compra. Tu producto es ${product}`,
       mediaUrl: 'https://edicion.parentesis.com/imagesPosts/coder00.jpg'
    });

    res.send('Whatsapp enviado');

})


app.listen(8080);
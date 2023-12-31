import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'alex.pinaida.55575@gmail.com',
        pass: 'wcwirpkezhkdadql'
    }
});

app.get('/mail', async (req, res) => {
    await transporter.sendMail({
        from: 'Coderhouse 55575',
        to: 'alex.pinaida94@gmail.com',
        subject: 'Correo de prueba 55575',
        html: `<div><h1>Hola, esto es una prueba de envio de correo usando gmail</h1>
        <img src="cid:dog1"/></div>`,
        attachments: [
            {
                filename: 'dog1.jpeg',
                path: './dog1.jpeg',
                cid: 'dog1'
            }
        ]
    });

    res.send('Correo enviado');
})

app.listen(8080);
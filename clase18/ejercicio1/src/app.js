import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setear nueestro middleware cookie parser a nivel de app
app.use(cookieParser('Coder47300Secret'));

//Configurar o setear una cookie
app.get('/cookies', (req, res) => {
    //maxAge es el tiempo de vida dee nuestra cookie
    res.cookie('CoderCookie', 'Esta cookie es muy poderosa', { maxAge: 30000 })
        .send('Cookie configurada correctamente')
});

//Obtener el valor de nuestra cookie
app.get('/all-cookies', (req, res) => {
    res.send(req.cookies);
});

app.get('/delete-cookies', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie eliminada correctamente');
});

app.get('/set-signed-cookies', (req, res) => {
    res.cookie('CoderSignedCookie', 'Esta es una cookier firmada muy poderosa', { maxAge: 30000, signed: true }).send('Cookie firmada exitosamente');
});

app.get('/all-signed-cookies', (req, res) => {
    res.send(req.signedCookies);
});

app.listen(8080, () => console.log('Server running'));
import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setear nueestro middleware cookie parser a nivel de app
app.use(cookieParser('Coder47300Secret'));

//Archivos estáticos
app.use(express.static(`${__dirname}/public`))
//Motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('cookies');
});

app.post('/cookie', (req, res) => {
    const data = req.body;
    res.cookie('CoderCookie', data, { maxAge: 10000 })
        .send({ status: 'success', message: 'cookie seteada correctamente' });
})

app.listen(8080, () => console.log('Server running'));
import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import __dirname from './utils.js';

const fileStore = FileStore(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de sessions
//Persistir nuestra session en archivos
// app.use(session({
//     store: new fileStore({
//         path: `${__dirname}/sessions`,
//         ttl: 30,
//         retries: 0
//     }),
//     secret: 'Coder47300Secret',
//     resave: true,
//     saveUninitialized: true,
// }));
//Persistir nuestra session en BDD
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/clase19?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 10 //en segundos
    }),
    secret: 'Coder47300Secret',
    resave: true,
    saveUninitialized: true,
}));

//Middleware de autenticación
function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        return next();
    }

    return res.status(401).send('Error de validadicón de permisos');
}

app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido');
    }
});

//Vamos a resolver el flujo de login
app.get('/login', (req, res) => {
    const { username, password } = req.query;

    if(username !== 'pepe' || password !== 'pepepass') {
        return res.status(401).send('Login fallido');
    }

    req.session.user = username;
    req.session.admin = true;
    res.send('Login exitoso');
});

//Validar si un usuario puede o no consumir determinado servicio
//Vamos a construir un servicio privado
app.get('/private', auth, (req, res) => {
    res.send('Tienes permisos para acceder a este servicio');
});

app.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (!error) res.send('Sesión cerrada correctamente');
        else res.send({ status: 'error', message: error.message });
    });
})

app.listen(8080, () => console.log('Server running'));
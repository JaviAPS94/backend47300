import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

const app = express();

try {
    await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/clase19?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Persistir nuestra session en BDD
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600 //en segundos
    }),
    secret: 'Coder47300Secret',
    resave: true,
    saveUninitialized: true,
}));

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(8080, () => console.log('Server running'));
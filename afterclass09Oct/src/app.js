import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import __dirname from './utils.js'
import viewsRouter from './routes/web/views.router.js';
import productsRouter from './routes/api/products.router.js';
import Sockets from './sockets/sockets.js';

const app = express()
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

const expressServer = app.listen(8080, () => console.log('Listening server on port 8080'));

const io = new Server(expressServer);

app.set('socketio', io);

Sockets(io);
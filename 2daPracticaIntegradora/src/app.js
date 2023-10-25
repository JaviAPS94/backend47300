import express from 'express';
import StudentsRouter from './routes/students.router.js';
import CoursesRouter from './routes/courses.router.js';
import UsersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import initializePassport from './config/passport.js';
import passport from 'passport';

const coursesRouter = new CoursesRouter();
const usersRouter = new UsersRouter();
const studentsRouter = new StudentsRouter();

const app = express();

initializePassport();
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/students', studentsRouter.getRouter());
app.use('/api/courses', coursesRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());

try {
    await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/2dapractica?retryWrites=true&w=majority');
    console.log('DB connected')
} catch (error) {
    console.log(error.message);
};

app.listen(8080, () => console.log('Server running'));
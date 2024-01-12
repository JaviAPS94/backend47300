import express from 'express';
import StudentsRouter from './routes/students.router.js';
import CoursesRouter from './routes/courses.router.js';
import UsersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import { __dirname, __mainDirname } from './utils/utils.js';
import initializePassport from './config/passport.js';
import passport from 'passport';
import { addLogger } from './utils/logger.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerFile from '../swagger-output.json' assert { type: 'json' }

const coursesRouter = new CoursesRouter();
const usersRouter = new UsersRouter();
const studentsRouter = new StudentsRouter();

const app = express();

initializePassport();
app.use(passport.initialize());

app.use(addLogger);

//Config documentación con swagger
console.log(__mainDirname);

// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.1',
//         info: {
//             title: 'Documentación de nuestra 4ta práctica integradora',
//             description: 'API usada para el manejo de la asignación de estudiantes a sus cursos respectivos'
//         }
//     },
//     apis: [`${__mainDirname}/docs/**/*.yaml`]
// };

// const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/students-v2', studentsRouter.getRouter());
app.use('/api/courses', coursesRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());

app.listen(8080, () => console.log('Server running'));
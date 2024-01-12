import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '1.0.0',
        title: 'Documentación generada con auto gen',
        description: 'Documentación 4ta práctica integradora'
    },
    host: 'localhost:8080',
    basePath: '/',
    schemes: ['http'],
    tags: [
        {
            name: 'Users',
            description: 'Servicios de usuarios'
        },
        {
            name: 'Sesssions',
            description: 'Servicios de sesiones'
        }
    ],
    definitions: {
        Login: {
            accessToken: 'asdadhgasfdjh345hfkasdfjk'
        }
    }
};

const outputFile = './swagger-output.json';
const endPointsFiles = ['./src/routes/courses.router.js','./src/routes/students.router.js','./src/routes/users.router.js'];

swaggerAutogen(outputFile, endPointsFiles, doc).then(async () => {
    await import('./src/app.js');
})
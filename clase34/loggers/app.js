import express from 'express';
import { addLogger } from './utils/logger.js';

const app = express();

app.use(addLogger);

app.get('/', (req, res) => {
    //default levels
    // req.logger.error('prueba error');
    // req.logger.warn('prueba warn');
    // req.logger.info('prueba info');
    // req.logger.http('prueba http');
    // req.logger.verbose('prueba verbose');
    // req.logger.debug('prueba debug');
    // req.logger.silly('prueba silly');

    //custom levels
    req.logger.error('prueba error');
    req.logger.warning('prueba warn');
    req.logger.info('prueba info');
    req.logger.debug('prueba debug');
});

app.listen(8080);
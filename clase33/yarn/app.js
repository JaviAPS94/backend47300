import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.send('servicio de prueba update');
});

app.listen(8081);
import express from 'express';
import * as MATH from '47300alexp';

const app = express();

app.get('/:action', (req, res) => {
    const operation = req.params.action;
    const { a, b } = req.query;
    let result;
    switch (operation) {
        case 'suma':
            result = MATH.suma(Number(a), Number(b));
            break;
        case 'resta':
            result = MATH.resta(Number(a), Number(b));
            break;
        case 'multiplicacion':
            result = MATH.multiplicacion(Number(a), Number(b));
            break;
        case 'divison':
            result = MATH.divison(Number(a), Number(b));
            break;
        default:
            break;
    };

    res.send({ result });
});

app.listen(8081);
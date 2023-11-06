import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ["https://coderhouse.com"]
}));

app.get('/', (req, res) => {
    res.json({ message: 'Saludos clase 47300' })
});

app.listen(8095);
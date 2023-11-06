import express from "express";
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

try {
    await mongoose.connect('mongodb+srv://fabianparentelli007code:MU8O6JWQtjzskwZE@clusterfabian.kpwq3c1.mongodb.net/ecommerce?retryWrites=true&w=majority');

    console.log('Conected DB');

} catch (error) {
    console.error(error);
};


app.listen(8080, () => console.log('Server runing in port 8080'));
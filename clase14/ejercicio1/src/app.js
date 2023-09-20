import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

//Conexion a la BDD
try {
    await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/?retryWrites=true&w=majority');
    console.log('BDD conectada')
} catch (error) {
    console.log(error.message);
}

app.listen(8081);
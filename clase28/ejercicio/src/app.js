import express from "express";
import contactsRouter from './routes/contacts.router.js';
import mongoose from "mongoose";

const app = express();

// try {
//     await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/clase28?retryWrites=true&w=majority')
// } catch (error) {
//     console.log(error);
// }

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.listen(8080, () => console.log('Server running'));
import mongoose from 'mongoose';

export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/ecommerce?retryWrites=true&w=majority');
    }

    static getInstance() {
        //validamos si ya existe la instancia creada
        if(this.#instance) {
            console.log('La conexion ya existe');
            return this.#instance;
        }

        console.log('La conexion no existe, se crea una nueva');
        this.#instance = new MongoSingleton();
        return this.#instance;
    }
}
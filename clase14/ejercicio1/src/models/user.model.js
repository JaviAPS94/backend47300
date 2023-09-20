import mongoose from 'mongoose';

//Especificando el nombre de la colección
const userCollection = 'usuarios';

//Vamos a definir el schema de nuestro documento, atributos del usuario
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
});

//Parte funcional me refiero a que con el modelo puedo interactuar (consultas, transacciones) con mi BDD
export const userModel = mongoose.model(userCollection, userSchema);
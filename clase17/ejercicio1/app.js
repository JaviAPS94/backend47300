import ordersModel from "./models/orders.js";
import mongoose from "mongoose";

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/clase17?retryWrites=true&w=majority');
        console.log('BDD Connected');

        // const orders = [
        //     {
        //         name: "Pepperoni", size: "medium", price: 19,
        //         quantity: 10, date: "2021-03-13T08:14:30Z"
        //     },
        //     {
        //         name: "Pepperoni", size: "medium", price: 20,
        //         quantity: 20, date: "2021-03-13T09:13:24Z"
        //     },
        //     {
        //         name: "Pepperoni", size: "large", price: 21,
        //         quantity: 30, date: "2021-03-17T09:22:12Z"
        //     },
        //     {
        //         name: "Cheese", size: "small", price: 12,
        //         quantity: 15, date: "2021-03-13T11:21:39.736Z"
        //     },
        //     {
        //         name: "Cheese", size: "medium", price: 13,
        //         quantity: 50, date: "2022-01-12T21:23:13.331Z"
        //     },
        //     {
        //         name: "Cheese", size: "large", price: 14,
        //         quantity: 10, date: "2022-01-12T05:08:13Z"
        //     },
        //     {
        //         name: "Vegan", size: "small", price: 17,
        //         quantity: 10, date: "2021-01-13T05:08:13Z"
        //     },
        //     {
        //         name: "Vegan", size: "medium", price: 18,
        //         quantity: 10, date: "2021-01-13T05:10:13Z"
        //     }
        // ];

        // await ordersModel.insertMany(orders);

        // const ordersResult = await ordersModel.find();
        // console.log(ordersResult);

        //Nuestra agregración
        const orders = await ordersModel.aggregate([
            //Va a contener las stages de nuestro pipeline
            //Vamos a definir nuestro primer stage
            //Vamos a filtrar las pizzas que sea tamaño mediano
            {
                $match: { size: 'medium' }
            },
            //El resultado del stage anterior, es la data de entrada de este stage
            //Segundo, agrupar las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores.
            //Segundo stage
            {
                $group: { _id: '$name', totalQuantity: {$sum: '$quantity'} }
            },
            //Vamos a ordenas los documenttos de acuerdo al atributo totalQuuaantity de mayor a menor
            {
                $sort: { totalQuantity: -1 }
            },
            //Vamos a agrupar nuestros documentos para tenere nuestros registros en un arreglo
            //para que posteriormente cuando generemos el nuevo documentos, estos resultados no se guarden por separado
            //root accedo a todas las propiedades del objeto
            {
                $group: { _id: 1, orders: { $push: '$$ROOT' } }
            },
            //Vamos a aplicar una proyección, vamos a generar un nuevo documento con un nuevo ObjectId
            {
                $project: {
                    '_id': 0, //que voy aa generar un ObjectId automáticos,
                    orders: '$orders'
                }
            },
            //Vamos a generar nuestra nueva colección llamada reportes
            {
                $merge: {
                    into: 'reports'
                }
            }
        ]);

        console.log(JSON.stringify(orders, null, '\t'));

    } catch (error) {
        console.log(error);
    }
};

environment();
import { cartModel } from '../models/carts.model.js';

export default class Carts {

    constructor() {
        console.log('Working Carts with DB');
    };

    getById = async (cid) => {
        const cart = await cartModel.findOne({_id : cid});
        return cart;
    }

    update = async (cid, cart) => {
        const result = await cartModel.updateOne({ cid }, cart);
        return result;
    }

    // delete = async (cid, id) => {
    //     //const cart = await this.getOne(cid);
    //     //Logica de negocio
    //     // const itemIndex = cart.products.findIndex(product => product.product.toString() === id);
    //     // if (itemIndex !== -1) {
    //     //     cart.products.splice(itemIndex, 1);
    //     //     const result = await this.update(cid, cart);
    //     //     return `Item with id ${id} deleted from cart ${cid}`;
    //     // } else {
    //     //     return `Item with id ${id} not found in cart ${cid}`;
    //     // }
    // }
};
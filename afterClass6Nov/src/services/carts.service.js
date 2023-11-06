import Carts from '../dao/dbManager/carts.dbManager.js';
import Products from '../dao/dbManager/products.dbManager.js';

const cartsManager = new Carts();
const productsManager = new Products();

const addProductToCart = async (cid, pid) => {
    const cart = await cartsManager.getById(cid);
    const product = await productsManager.getById(pid);

    const exist = cart.products.findIndex( pro => pro.product.toString() === product._id.toString());
    
    if(exist !== -1) {
        cart.products[exist].quantity++;
    } else {
        cart.products.push({product: product._id});
    };

    const result = await cartsManager.update(cart._id, cart);
    return result;
}

const deleteProduct = async (cid, pid) => {
    const cart = await cartsManager.getById(cid);
    //Logica de negocio
    const itemIndex = cart.products.findIndex(product => product.product.toString() === id);
    if (itemIndex !== -1) {
        cart.products.splice(itemIndex, 1);
        await cartsManager.update(cid, cart);
        return `Item with id ${id} deleted from cart ${cid}`;
    } else {
        return `Item with id ${id} not found in cart ${cid}`;
    }
}

export {
    addProductToCart
}
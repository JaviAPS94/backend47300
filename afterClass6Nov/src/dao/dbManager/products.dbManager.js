import { productModel } from '../models/products.model.js';

export default class Products {

    constructor() {
        console.log('Working Products with DB');
    };

    getAll = async (limit, page, sort) => {
        const products = await productModel.paginate({}, { limit, page, lean: true, sort});
        return products;
    };

    getById = async (pid) => {
        const product = await productModel.findOne({ _id: pid });
        return product;
    }
};
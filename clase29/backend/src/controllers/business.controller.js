import * as businessService from '../services/business.service.js';

const getBusiness = async (req, res) => {
    try {
        //Necesito un método que me permita obtener el listado de negocios
        const result = await businessService.getBusiness();
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        //Necesito un método que me permita obtener un negocio por su identificador
        const result = await businessService.getBusinessById(id);

        if(!result) {
            return res.status(404).send({ status: 'error', message: 'business not found' });
        }

        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const createBusiness = async (req, res) => {
    try {
        const business = req.body;
        //Debería implementar un método que me permita guardar el negocio en BDD
        const result = await businessService.createBusiness(business);

        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = req.body;
        const { id } = req.params;

        //Vamos a validar que el negocio que estamos tratando de agregar un producto exista en bdd
        //Deberíamos implementar un método para obtener el negocio por id
        const businessResult = await businessService.getBusinessById(id);

        if(!businessResult) {
            return res.status(404).send({ status: 'error', message: 'business not found' });  
        }

        //Debería implementar un método que me permita guardar el producto dentro del negocio en BDD

        const updateResult = await businessService.updateBusiness(businessResult, product);

        res.send({ status: 'success', result: updateResult });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

export {
    getBusiness,
    getBusinessById,
    createBusiness,
    addProduct
}
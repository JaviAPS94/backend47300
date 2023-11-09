const getBusiness = async (req, res) => {
    try {
        //Necesito un método que me permita obtener el listado de negocios
        res.send({ status: 'success', message: 'getBusiness' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        //Necesito un método que me permita obtener un negocio por su identificador
        if(!result) {
            return res.status(404).send({ status: 'error', message: 'business not found' });
        }

        res.send({ status: 'success', message: 'getBusinessById' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const createBusiness = async (req, res) => {
    try {
        const business = req.body;
        //Debería implementar un método que me permita guardar el negocio en BDD

        res.send({ status: 'success', message: 'createBusiness' });
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
        if(!businessResult) {
            return res.status(404).send({ status: 'error', message: 'user not found' });  
        }

        //Debería implementar un método que me permita guardar el producto dentro del negocio en BDD

        res.send({ status: 'success', message: 'addProduct' });
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
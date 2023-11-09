const getOrders = async (req, res) => {
    try {
        //Necesito un método que me permita obtener el listado de ordenes
        res.send({ status: 'success', message: 'getOrders' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        //Necesito un método que me permita obtener una orden por su identificador
        if(!result) {
            return res.status(404).send({ status: 'error', message: 'order not found' });
        }

        res.send({ status: 'success', message: 'geetOrderById' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const createOrder = async (req, res) => {
    try {
        // {
        //     user: 'id del usuario de mongo',
        //     business: 'id del negocio de monbo',
        //     products: [1,2,3]
        // }
        const { user, business, products } = req.body;

        //Vamos a validar que el usuario que esta tratando de crear la orden existe en bdd
        //Deberíamos implementar un método para obtener eel usuario por id
        if(!userResult) {
            return res.status(404).send({ status: 'error', message: 'user not found' });  
        }

        //Vamos a validar que el neegocio que se esta tratando de asociar la orden existe en bdd
        //Deberíamos implementar un método para obtener eel usuario por id
        if(!businessResult) {
            return res.status(404).send({ status: 'error', message: 'business not found' });  
        }

        //Deberíamos tener la implementación del método que me peermita crear una orden

        res.send({ status: 'success', message: 'createOrder' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const resolveOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        //Vamos a validar que la orden que se esta tratando de resolver o cambiar el estado, exista en bdd
        //Deberíamos implementar un método para obtener la orden por id
        if(!orderResult) {
            return res.status(404).send({ status: 'error', message: 'order not found' });  
        }

        //Deberíamos implementar un método para resolver la orden

        res.send({ status: 'success', message: 'resolveOrder' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

export {
    getOrders,
    getOrderById,
    createOrder,
    resolveOrder
}
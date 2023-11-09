const getUsers = async (req, res) => {
    try {
        //Necesito un método que me permita obtener el listado de usuarios
        res.send({ status: 'success', message: 'getUsers' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        //Necesito un método que me permita obtener un usuario por su identificador
        if(!result) {
            return res.status(404).send({ status: 'error', message: 'user not found' });
        }

        res.send({ status: 'success', message: 'getUserById' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = req.body;
        //Debería implementar un método que me permita guardar el usuario en BDD

        res.send({ status: 'success', message: 'createUser' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

export {
    getUsers,
    getUserById,
    createUser
}
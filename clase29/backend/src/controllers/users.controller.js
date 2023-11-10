import * as usersService from '../services/users.service.js';

const getUsers = async (req, res) => {
    try {
        //Necesito un método que me permita obtener el listado de usuarios
        const result = await usersService.getUsers();
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        //Necesito un método que me permita obtener un usuario por su identificador

        const result = await usersService.getUserById(id);

        if(!result) {
            return res.status(404).send({ status: 'error', message: 'user not found' });
        }

        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = req.body;
        //Debería implementar un método que me permita guardar el usuario en BDD

        const result = await usersService.createUser(user);

        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
}

export {
    getUsers,
    getUserById,
    createUser
}
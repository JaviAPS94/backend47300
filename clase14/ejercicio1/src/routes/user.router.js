import { Router } from 'express';
import { userModel } from '../models/user.model.js';

const router = Router();

//Obtención de usuarios
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send({ status: 'success', payload: users })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
        return res.status(400).send({ error: 'incomplete values' })
    }

    try {
        const result = await userModel.create({
            first_name,
            last_name,
            email
        });

        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
});

//Actualización
router.put('/:uid', async (req, res) => {
    const { uid } = req.params;

    const userToReplace = req.body;

    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
        return res.status(400).send({ error: 'incomplete values' })
    }

    try {
        const result = await userModel.updateOne(
            {_id: uid}, userToReplace
        );

        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
});

router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const result = await userModel.deleteOne({
            _id: uid
        });

        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
});

export default router;
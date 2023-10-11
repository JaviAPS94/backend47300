//Rutas para trabajar con servicios de sessions
import { Router } from 'express';
import usersModel from '../models/users.model.js'
import { createHash, isValidPassword } from '../utils.js'

const router = Router();

//Primer servicio para registrar el usuario
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await usersModel.findOne({ email });

        if (exists) {
            return res.status(400).send({ status: 'error', message: 'User aflready exists' });
        }

        console.log(password);
        await usersModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        });

        res.status(201).send({ status: 'success', message: 'User registered' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
});

//Segundo servicio para loguear el usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });
        
        if (!user) {
            return res.status(401).send({ status: 'error', message: 'incorrect credentials' });
        }

        if(!isValidPassword(password, user.password))
            return res.status(401).send({ status: 'error', message: 'incorrect credentials' });

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }

        res.send({ status: 'success', message: 'login success' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({ status: 'error', error: 'logout fail' });
        res.redirect('/');
    })
})

export default router;
import { Router } from 'express';
import { passportCall, generateToken, authorization } from '../utils.js';
import passport from 'passport';

const router = Router();

const users = [
    {
        name: 'prueba',
        email: 'prueba@gmail.com',
        password: '1234',
        role: 'admin'
    }
];

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = users.find(user => user.email === email);

        if(exists) return res.status(400).send({ status: 'error', message: 'userr already exists' });

        const user = {
            name,
            email,
            password
        };

        users.push(user);

        //generar el token de acceso

        const accessToken = generateToken(user);
        res.send({ status: 'sucess', access_token: accessToken });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find(user => user.email === email && user.password === password);

        if (!user) return res.status(401).send({ status: 'error', message: 'invalid credentials' });

        //generar el token de acceso

        delete user.password;

        const accessToken = generateToken(user);

        res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: 'success' })
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({ status: 'sucess', payload: req.user });
});

router.get('/private-custom', passportCall('jwt'), authorization('admin'), (req, res) => {
    res.send({ status: 'sucess', payload: req.user });
});

export default router;
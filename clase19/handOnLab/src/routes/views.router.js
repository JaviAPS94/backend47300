//Solo rutas que vayamos a trabajar con vistas
import { Router } from 'express';

const router = Router();

const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/');
    next();
}

const privateAcess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

router.get('/', privateAcess, (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});

export default router;
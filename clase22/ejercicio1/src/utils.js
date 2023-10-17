import {fileURLToPath} from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRIVATE_KEY = 'coder47300'

const generateToken = (user) => {
    //78238Y5JNSDGJKDSNFG7234574235NKFDJDNN#%^&^^&&*&&
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if(err) return next(err);
            if(!user) {
                return res.status(401).send({ status: 'error', error: info.messages ? info.messages : info.toString() })
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const authorization = (role) => {
    return async (req, res, next) => {
        //en este punto ya tengo el usuario en req.user
        if(req.user.role !== role) return res.status(403).send({ status: 'error', message: 'not permissions'  })
        next();
    }
}

export {
    generateToken,
    __dirname,
    PRIVATE_KEY,
    passportCall
};
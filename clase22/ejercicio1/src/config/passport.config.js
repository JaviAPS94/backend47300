import passport from 'passport';
import jwt from 'passport-jwt';
import { PRIVATE_KEY } from '../utils.js'

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) => {
        //jwt_payload
        // "user": {
        //     "name": "prueba",
        //     "email": "prueba@gmail.com",
        //     "password": "1234"
        //   }
        try {
            // if(!jwt_payload.jaksdhfjaskhdfk) return done(null, false, { messages: 'error invalid attribute' })
            return done(null, jwt_payload.user); //req.user
        } catch (error) {
            return done(error);
        }
    }))
};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
}

export default initializePassport;
import passport from 'passport';
import local from 'passport-local';//mecanismo usuario y contraseña
import usersModel from '../models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';

//La idea es mover acá la implementación de registro y login
//Passport funciona como un middleware a nivel de aplicación o global

const LocalStrategy = local.Strategy; //usuario y contraseña

const initializePassport = () => {
    //Passport register
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,//me permite acceder al objeto request como cualquier otro middleware
        usernameField: 'email'
    }, async (req, username, password, done) => { //done callback para retornar algo en el caso de éxito o retornar un error al moomento del registro
        try {
            console.log(username, password);
            const { first_name, last_name, age } = req.body;
            const exists = await usersModel.findOne({ email: username });
            console.log(exists);
    
            if (exists) {
                return done(null, false);
            }
    
            const user = await usersModel.create({
                first_name,
                last_name,
                email: username,
                age,
                password: createHash(password)
            });
            
            return done(null, user);//req.user
        } catch (error) {
            console.log(error);
            return done(`Error al registrar el usuario ${error.message}`)
        }
    }));

    //Passport login
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => { //done callback para retornar algo en el caso de éxito o retornar un error al moomento del registro
        try {
            const user = await usersModel.findOne({ email: username });
            
            if (!user) {
                return done(null, false);
            }
    
            if(!isValidPassword(password, user.password))
                return done(null, false);
    
            return done(null, user); //req.user
        } catch (error) {
            return done(`Error al loguear el usuario ${error.message}`);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) => {
        const user = await usersModel.findById(id);
        done(null, user); //req.user
    })
};

export default initializePassport;
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import usersModel from '../models/users.model.js';

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.21c8b8d2b0895c9e',
        clientSecret: '6e5c5c0608ec6bc9e8dbc728c52149ac241c4eec',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const email = profile.emails[0].value; //dentro de este atrubito va a llegar el correo

            const user = await usersModel.findOne({ email });

            if(!user) {
                //crear la cuenta o el usuario desde cero
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                };

                const result = await usersModel.create(newUser);
                return done(null, result);
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) => {
        const user = await usersModel.findById(id);
        done(null, user); //req.user
    })
};

export default initializePassport;
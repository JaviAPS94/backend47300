import UsersRepository from '../repositories/users.repository.js';
import { Users } from '../dao/factory.js';
import { InvalidCredentials, UserAlreadyExists, UserNotFound } from '../utils/custom.exceptions.js'
import { createHash, generateToken, isValidPassword } from '../utils/utils.js';
import { sendEmail } from './mail.service.js';
import { loginFailNotification, loginNotification } from '../utils/custom.html.js';
 
const usersDao = new Users();
const usersRepository = new UsersRepository(usersDao);

const login = async (password, email) => {
    const user = await usersRepository.getByEmail(email);
    
    if (!user) {
        throw new UserNotFound('incorrect credentials')
    }

    const comparePassword = isValidPassword(password, user.password);

    if(!comparePassword) {
        const emailFailParams = {
            to: user.email,
            subject: 'Login fallido',
            html: loginFailNotification
        }
    
        await sendEmail(emailFailParams);

        throw new InvalidCredentials('incorrect credentials');
    }

    const accessToken = generateToken(user);

    const emailParams = {
        to: user.email,
        subject: 'Login exitoso',
        html: loginNotification
    }

    await sendEmail(emailParams);

    return accessToken;
}

const register = async (user) => {
    const userByEmail = await usersRepository.getByEmail(user.email);

    if (userByEmail) {
        throw new UserAlreadyExists('user already exists');
    }

    const hashedPassword = createHash(user.password);

    const newUser = {
        ...user
    }

    newUser.password = hashedPassword;

    const result = await usersRepository.save(newUser);

    return result;
}

export {
    login,
    register
}
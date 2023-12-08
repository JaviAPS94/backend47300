import * as usersService from '../services/users.service.js';
import { InvalidCredentials, UserAlreadyExists, UserNotFound } from '../utils/custom.exceptions.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const accessToken = await usersService.login(password, email);
        res.sendSuccess({ accessToken });
    } catch (error) {
        if (error instanceof UserNotFound) {
            return res.sendClientError(error.message);
        }

        if (error instanceof InvalidCredentials) {
            return res.sendClientError(error.message);
        }

        res.sendServerError(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { first_name, last_name, role, email, password } = req.body;
        
        if (!first_name || !last_name || !role || !email || !password) {
            return res.sendClientError('incomplete values');
        }

        const result = await usersService.register({ ...req.body });

        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            return res.sendClientError(error.message);
        }

        res.sendServerError(error.message)
    }
}

export {
    login,
    register
}
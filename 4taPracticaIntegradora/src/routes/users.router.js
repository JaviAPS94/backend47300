import Router from './router.js';
import { accessRoles, passportStrategiesEnum } from '../config/enums.js';
import { login, register } from '../controllers/users.controller.js'

export default class UsersRouter extends Router {
    init() {
        this.post('/login', [accessRoles.PUBLIC], passportStrategiesEnum.NOTHING, login);
        this.post('/register', [accessRoles.PUBLIC], passportStrategiesEnum.NOTHING, register);
    }

    // async login(req, res) {
    //     const { email, password } = req.body;
    //     try {
    //         const user = await this.usersManager.getByEmail(email);
    //         console.log(user);
            
    //         if (!user) {
    //             return res.sendClientError('incorrect credentials');
    //         }

    //         const comparePassword = isValidPassword(password, user.password);

    //         if(!comparePassword) {
    //             return res.sendClientError('incorrect credentials');
    //         }

    //         delete user.password;

    //         const accessToken = generateToken(user);
    //         res.sendSuccess({ accessToken });
    //     } catch (error) {
    //         res.sendServerError(error.message);
    //     }
    // }
}
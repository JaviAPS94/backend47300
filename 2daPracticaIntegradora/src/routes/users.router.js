import Router from './router.js';
import Users from '../dao/dbManagers/users.manager.js';
import { accessRoles, passportStrategiesEnum } from '../config/enums.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';

export default class UsersRouter extends Router {
    constructor() {
        super();
        this.usersManager = new Users();
    }

    init() {
        this.post('/login', [accessRoles.PUBLIC], passportStrategiesEnum.NOTHING, this.login);
        this.post('/register', [accessRoles.PUBLIC], passportStrategiesEnum.NOTHING, this.register);
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.usersManager.getByEmail(email);
            console.log(user);
            
            if (!user) {
                return res.sendClientError('incorrect credentials');
            }

            const comparePassword = isValidPassword(password, user.password);

            if(!comparePassword) {
                return res.sendClientError('incorrect credentials');
            }

            delete user.password;

            const accessToken = generateToken(user);
            res.sendSuccess({ accessToken });
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async register(req, res) {
        const { first_name, last_name, role, email, password } = req.body;
        try {
            if (!first_name || !last_name || !role || !email || !password) {
                return res.sendClientError('incomplete values');
            }

            const exists = await this.usersManager.getByEmail(email);

            if (exists) {
                return res.sendClientError('user already exists');
            }

            const hashedPassword = createHash(password);

            const newUser = {
                ...req.body
            }

            newUser.password = hashedPassword;

            const result = await this.usersManager.save(newUser);

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }
}
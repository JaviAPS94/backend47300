import Router from './router.js';
import Students from '../dao/dbManagers/students.manager.js';
import { accessRoles, passportStrategiesEnum } from '../config/enums.js';

export default class StudentsRouter extends Router {
    constructor() {
        super();
        this.studentsManager = new Students();
    }

    init() {
        this.get('/', [accessRoles.ADMIN], passportStrategiesEnum.JWT, this.getAll);
        this.post('/', [accessRoles.ADMIN], passportStrategiesEnum.JWT, this.save);
    }

    async getAll(req, res) {
        console.log("getAll");
        try {
            const students = await this.studentsManager.getAll();
            res.sendSuccess(students);
        } catch (error) {
            res.sendServerError(error.message);
        } 
    }

    async save(req, res) {
        console.log("save");
        const { first_name, last_name, dni, email, birth_date, gender } = req.body;

        if(!first_name || !last_name || !dni || !email || !birth_date || !gender) {
            return res.sendClientError('incomplete values');
        }
        console.log("pasamos el if");

        try {
            console.log("try");
            console.log({...req.body});
            const result = await this.studentsManager.save({...req.body});

            res.sendSuccessNewResource(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }
}
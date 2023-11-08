import Router from './router.js';
import Courses from '../dao/fileManagers/courses.manager.js';
import { accessRoles, passportStrategiesEnum } from '../config/enums.js';

export default class CoursesRouter extends Router {
    constructor() {
        super();
        this.coursesManager = new Courses();
    }

    init() {
        this.get('/', [accessRoles.ADMIN], passportStrategiesEnum.JWT, this.getAll);
        this.post('/', [accessRoles.ADMIN], passportStrategiesEnum.JWT, this.save);
    }

    async getAll(req, res) {
        try {
            const courses = await this.coursesManager.getAll();
            res.sendSuccess(courses);
        } catch (error) {
            res.sendServerError(error.message);
        } 
    }

    async save(req, res) {
        const { title, description, teacher } = req.body;

        if(!title || !description || !teacher) {
            return res.sendClientError('incomplete values');
        }

        try {
            const result = await this.coursesManager.save({
                title,
                description,
                teacher
            });

            res.sendSuccessNewResource(result);
        } catch (error) {
            res.sendServerError(error.message);
        } 
    }
}
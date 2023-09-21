import { studentsModel } from '../models/students.model.js';

export default class Students {
    constructor() {
        console.log('Working students with DB');
    }

    getAll = async () => {
        const students = await studentsModel.find();
        //POJO Plain Old JavaScript Object
        return  students.map(student => student.toObject());
    }

    save = async (student) => {
        const result = await studentsModel.create(student);
        return result;
    }
}
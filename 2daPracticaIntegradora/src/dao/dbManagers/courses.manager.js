import { coursesModel } from '../models/courses.model.js';

export default class Courses {
    constructor() {
        console.log('Working courses with DB');
    }

    //Clean Code, nombres descriptivos
    //SOLID
    //S=Single responsability
    //O=Open/Close
    //L=Liskov suubstitution
    //I=Interface segregation
    //D=Dependency inversion

    getAll = async () => {
        const courses = await coursesModel.find().lean();
        //POJO Plain Old JavaScript Object
        return courses;
    }

    save = async (course) => {
        const result = await coursesModel.create(course);
        return result;
    }

    update = async (id, course) => {
        const result = await coursesModel.updateOne({ _id: id}, course);
        return result;
    }
}
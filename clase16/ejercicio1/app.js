import mongoose from 'mongoose';
import usersInfo from './Users.json' assert { type: 'json' };
import userModel from './models/users.js';
import { studentsModel } from './models/students.model.js';
import { coursesModel } from './models/courses.model.js';

const environment = async () => {
    try {
        //Conexión hacia la BDD
        await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/clase16?retryWrites=true&w=majority')
        //Insertar el listado de usuario obtenidos de nuestro json
        // const responseInsert = await userModel.insertMany(usersInfo);
        // console.log(responseInsert);

        //Vamos a probar uuna consulta de acuerdo al nombre del usuario
        // const usersByNameStats = await userModel.find({ first_name: 'Jose' }).explain('executionStats');
        // console.log(usersByNameStats);

        //Vamos a insertar un estudiante
        // await studentsModel.create({
        //     first_name: 'Lucas',
        //     last_name: 'Vega',
        //     email: 'lv@gmail',
        //     gender: 'M'
        // });

        // //Vamos a insertar un curso
        // await coursesModel.create({
        //     title: 'Programación Backend',
        //     description: 'Programación backend con node',
        //     teacher: 'Alex'
        // });

        // await coursesModel.create({
        //     title: 'Programación FrontEnd',
        //     description: 'Programación frontend con react',
        //     teacher: 'Maximiliano'
        // });

        //Matricular o inscribir a Lucas en los cursos disponibles
        // const student = await studentsModel.findOne({ _id: '65136cc6bb76fdb1ec7b08d5'});

        // //Cuando obtenga el estudiante vamos a insertar o hacer push de los ids de cursos en el arreglo respectivo
        // student.courses.push({ course: '65136cc7bb76fdb1ec7b08d8' }, { course: '65136cc7bb76fdb1ec7b08da' });
        // const updateStudentResult = await studentsModel.updateOne({ _id: '65136cc6bb76fdb1ec7b08d5'}, student);
        // console.log(updateStudentResult);
        // const student = await studentsModel.find().populate('courses.course');
        const student = await studentsModel.find();
        console.log(JSON.stringify(student, null, '\t'));
    } catch (error) {
        console.log(error);
    }
}

environment();
import studentsModel from "./models/students.js";
import mongoose from "mongoose";

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://alexpinaida47300:iWtqbn7Dan1aIFD1@cluster47300ap.0rhmqgm.mongodb.net/clase17?retryWrites=true&w=majority');
        console.log('BDD Connected');

        // const students = [{ "first_name": "Justino", "last_name": "Fidgin", "email": "jfidgin0@boston.com", "gender": "Male", "grade": 6, "group": "1B" },
        // { "first_name": "Ketty", "last_name": "Robson", "email": "krobson1@prlog.org", "gender": "Female", "grade": 10, "group": "2A" },
        // { "first_name": "Dierdre", "last_name": "Barron", "email": "dbarron2@dailymail.co.uk", "gender": "Female", "grade": 9, "group": "1B" },
        // { "first_name": "Nana", "last_name": "Pellew", "email": "npellew3@nytimes.com", "gender": "Female", "grade": 6, "group": "1A" },
        // { "first_name": "Shannan", "last_name": "Preshous", "email": "spreshous4@paginegialle.it", "gender": "Male", "grade": 8, "group": "2B" },
        // { "first_name": "Mark", "last_name": "Yurchishin", "email": "iyurchishin5@google.it", "gender": "Male", "grade": 10, "group": "2B" },
        // { "first_name": "Tannie", "last_name": "Takkos", "email": "ttakkos6@mtv.com", "gender": "Female", "grade": 7, "group": "2B" },
        // { "first_name": "Debbi", "last_name": "Eddowis", "email": "deddowis7@jigsy.com", "gender": "Female", "grade": 6, "group": "1B" },
        // { "first_name": "Dugald", "last_name": "Toun", "email": "dtoun8@java.com", "gender": "Male", "grade": 4, "group": "1A" },
        // { "first_name": "Lorain", "last_name": "Judkin", "email": "ljudkin9@bigcartel.com", "gender": "Genderqueer", "grade": 8, "group": "2B" },
        // { "first_name": "Shelley", "last_name": "Crinion", "email": "scriniona@wsj.com", "gender": "Genderfluid", "grade": 8, "group": "2A" },
        // { "first_name": "Kellyann", "last_name": "Doel", "email": "kdoelb@merriam-webster.com", "gender": "Female", "grade": 8, "group": "1B" },
        // { "first_name": "Romona", "last_name": "Derricoat", "email": "rderricoatc@vkontakte.ru", "gender": "Female", "grade": 5, "group": "1A" },
        // { "first_name": "Lorine", "last_name": "McVaugh", "email": "lmcvaughd@unc.edu", "gender": "Female", "grade": 4, "group": "2A" },
        // { "first_name": "Ker", "last_name": "Chiese", "email": "kchiesee@prlog.org", "gender": "Male", "grade": 8, "group": "1A" },
        // { "first_name": "Aloisia", "last_name": "Hovie", "email": "ahovief@simplemachines.org", "gender": "Female", "grade": 8, "group": "2B" },
        // { "first_name": "Marshall", "last_name": "Chatten", "email": "mchatteng@creativecommons.org", "gender": "Male", "grade": 9, "group": "2B" },
        // { "first_name": "Marcelo", "last_name": "Rubega", "email": "mrubegah@house.gov", "gender": "Male", "grade": 6, "group": "1A" },
        // { "first_name": "Yves", "last_name": "Halsey", "email": "yhalseyi@naver.com", "gender": "Male", "grade": 5, "group": "2A" },
        // { "first_name": "Corene", "last_name": "Greed", "email": "cgreedj@epa.gov", "gender": "Female", "grade": 8, "group": "1A" }];

        // await studentsModel.insertMany(students);

        //Obtener a los estudiantes agrupados por calificación del mejor al peor
        const result1 = await studentsModel.aggregate([
            {
                $group: { _id: '$grade', students: { $push: '$$ROOT' }}
            },
            {
                $sort: { _id: -1 }
            }
        ])

        // Obtener a los estudiantes agrupados por grupo
        const result2 = await studentsModel.aggregate([
            {
                $group: { _id: '$group', students: { $push: '$$ROOT' }}
            }
        ]);

        //Obtener el promedio general de los estudiantes.
        const result3 = await studentsModel.aggregate([
            {
                $group: { _id: 'Students', promedio: { $avg: '$grade' } }
            }
        ]);

        //Obtener el promedio de calificación de las mujeres
        const result4 = await studentsModel.aggregate([
            {
                $match: { gender: 'Female' }
            },
            {
                $group: { _id: 'Female', promedio: { $avg: '$grade' } }
            }
        ]);

        //Obtener los estudiantes paginados
        const students = await studentsModel.paginate({}, { limit: 5, page: 2 });

        console.log(JSON.stringify(students, null, '\t'));

    } catch (error) {
        console.log(error);
    }
};

environment();
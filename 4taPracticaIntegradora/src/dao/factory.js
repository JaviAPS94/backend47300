import config from "../config/config.js";

export let Users;
export let Courses;

const persistence = config.persistence;

switch (persistence) {
    case 'MONGO':
        console.log('Trabajando con persistencia en Mongo');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import ('./dbManagers/users.manager.js');
        const { default: CoursesMongo } = await import ('./dbManagers/courses.manager.js');
        Users = UsersMongo;
        Courses = CoursesMongo;
        break;
    case 'FILE':
        // const { default: UsersFile } = await import ('./fileManagers/users.manager.js');
        // Users = UsersFile;
        break
}
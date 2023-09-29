import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const studentsCollection = 'students';

const studentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: String
});

studentSchema.plugin(mongoosePaginate);

const studentsModel = mongoose.model(studentsCollection, studentSchema);

export default studentsModel;
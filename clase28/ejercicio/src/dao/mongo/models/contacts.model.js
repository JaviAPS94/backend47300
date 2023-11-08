import mongoose from 'mongoose';

const contactsCollection = 'contacts';

const contactsSchema = new mongoose.Schema({
    name: String,
    phone: String
});


// {
//     last_name: 'adsasd',
//     country_id: '',

// }
//API FACEBOOK
// GET USERS
// [
//     {
//         nombre: "Robert",
//         apellido: "Mendoza",
//         telefono: "732y45782345y8"
//         lastname: 'asdasd',
//         countryId: '234234' 
//     }
// ]

const contactsModel = mongoose.model(contactsCollection, contactsSchema);

export default contactsModel;
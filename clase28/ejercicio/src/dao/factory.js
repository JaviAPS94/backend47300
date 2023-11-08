import config from "../config/config.js";

let Contacts;
// let Products;
// let Carts;

const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Trabajando con BDD');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: ContactsMongo } = await import('./mongo/contacts.mongo.js');
        // const { default: ProductsMongo } = await import('./mongo/products.mongo.js');
        // Products = ProductsMongo;
        Contacts = ContactsMongo;
        break;
    case 'MEMORY':
        console.log('Trabajando con memoria');
        const { default: ContactsMemory } = await import('./memory/contacts.memory.js');
        Contacts = ContactsMemory;
        break;
}

export {
    Contacts
}
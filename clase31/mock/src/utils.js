import { fakerES as faker } from '@faker-js/faker';

const generateUser = () => {
    //Vamos a generar de manera randómica el # de productos que esta comprando un usuario
    const numberOfProducts = faker.number.int({ min: 1, max: 5 });

    let products = [];

    for (let i = 0; i < numberOfProducts; i++) {
        products.push(generateProduct());
    }

    return {
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        id: faker.database.mongodbObjectId(),
        products,
        jobTitle: faker.person.jobTitle(), //parte 2
        premium: faker.datatype.boolean(), //parte 2
        role: faker.helpers.arrayElement(['cliente','vendedor']) //parte 2
    }
}

const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url(),
        description: faker.commerce.productDescription(), //parte 2
        code: faker.string.alphanumeric(10) //parte 2
    }
}

export {
    generateUser
}
import Toys from '../dao/memoryManagers/toys.manager.js';

const toysManager = new Toys();

const getToys = async () => {
    //Para agreegar un producto debemos validar el stock del mismo
    //Requerimiento retornar los jugues ordenados de mayor a menor según el precio
    const toys = await toysManager.getAll();
    //Implementar un algoritmo que me permita ordenar los juguetes
    //
    //
    //
    //
    return toys; 
}

const saveToy = async (toy) => {
    await toysManager.save(toy);
    return toy;
}

const getToysUser = async(email) => {
    //buscar el usuario por email
    //voy a usar el manager de users
    //voy a buscar los jugues que tiene el user
    //usando el manager de juguetes busco los asociados al usuario
}

export {
    saveToy,
    getToys
}
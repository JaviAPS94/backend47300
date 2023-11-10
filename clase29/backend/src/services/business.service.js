import BusinessDao from '../dao/classes/business.dao.js'

const businessDao = new BusinessDao();

const getBusiness = async() => {
    const result = await businessDao.getBusiness();
    return result;
}

const getBusinessById = async(id) => {
    const result = await businessDao.getBusinessById(id);
    return result;
}

const createBusiness = async(business) => {
    const result = await businessDao.createBusiness(business);
    return result;
}

const updateBusiness = async(business, product) => {
    business.products.push(product);
    const result = await businessDao.updateBusiness(business._id, business);
    return result;
}

export {
    getBusiness,
    getBusinessById,
    createBusiness,
    updateBusiness
}
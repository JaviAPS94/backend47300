import OrdersDao from "../dao/classes/orders.dao.js";
import UsersDao from "../dao/classes/users.dao.js";

const ordersDao = new OrdersDao();
const usersDao = new UsersDao();

const createOrder = async(user, business, products) => {
    //{
    //     name:
    // }
    // {
    //     name:
    //     products
    // }
    // {
    //     number: 1123123,
    //     business,
    //     user,
    //     status: 'pending',
    //     products: [1,2,3],
    //     total_price: 50
    // }
    // [
    //     {
    //         id: 1
    //         price: 20
    //     }
    // ]

    //Vamos a buscar los productos que si forman parte de x negocio
    const currentProducts = business.products.filter((product) => 
        products.includes(product.id)
    );

    const totalPrice = currentProducts.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    }, 0);

    const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1);

    const order = {
        number: orderNumber,
        business: business._id,
        user: user._id,
        status: 'PENDING',
        products: currentProducts.map((product) => product.id),
        total_price: totalPrice
    };

    const orderResult = await ordersDao.createOrder(order);

    user.orders.push(orderResult._id);

    await usersDao.updateUser(user._id, user);

    return orderResult;
}

const getOrders = async() => {
    const result = await ordersDao.getOrders();
    return result;
}

const getOrderById = async(id) => {
    const result = await ordersDao.getOrderById(id);
    return result;
}

const resolveOrder = async(order, status) => {
    order.status = status;
    await ordersDao.updateOrder(order._id, order);
    return order;
}

export {
    createOrder,
    getOrders,
    getOrderById,
    resolveOrder
}
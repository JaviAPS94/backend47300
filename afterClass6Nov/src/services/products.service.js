const getProductsPaginated = async(limit, page, sort) => {
    let sortResult;
    if (sort === 'asc') {
        sortResult = { price: 1 };
    } else if (sort === 'desc') {
        sortResult = { price: -1 };
    } else {
        sortResult = {};
    };

    const products = await productManager.getAll(limit, page, sortResult);

    const url = '/products?'
    products.prevLink = products.hasPrevPage ? `${url}page=${products.prevPage}` : null;
    products.nextLink = products.hasNextPage ? `${url}page=${products.nextPage}` : null;

    return products;
}
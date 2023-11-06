const getProductsPaginated = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort } = req.query;
        
        const products = await productsService.getProductsPaginated(limit, page, sort)
        
        res.render('products', products);

    } catch (error) {
       res.render('products' ,{ status: 'error', error });
    };
}